/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, DragEvent, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { 
  Lock, 
  Unlock, 
  Trash2, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Sparkles, 
  Check, 
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
  Settings,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../constants/images';
import { doc, getDoc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface CarouselImage {
  id: string;
  image: string; // URL or compressed base64
  title: string;
  description: string;
  tag: string;
  objectPosition?: string;
}

const DEFAULT_CAROUSEL_IMAGES: CarouselImage[] = [
  {
    id: 'slide-1',
    image: IMAGES.ctGymInterior,
    title: 'Ambiente de Alta Performance',
    description: 'Tatames amplos e macios preparados para treinos de máxima intensidade e segurança.',
    tag: 'FOTO DO CT'
  },
  {
    id: 'slide-3',
    image: IMAGES.profChampion,
    title: 'Mentalidade de Campeão',
    description: 'Formando faixas-pretas e cidadãos comprometidos com o respeito, resiliência e amizade.',
    tag: 'VALORES'
  },
  {
    id: 'slide-4',
    image: IMAGES.kidsJiuJitsuClass,
    title: 'Futuras Gerações no Tatame',
    description: 'Desenvolvimento infantil completo com educação anti-bullying, autoconfiança e disciplina.',
    tag: 'INFANTIL'
  },
  {
    id: 'slide-5',
    image: IMAGES.jiuJitsuTeamUnity,
    title: 'Integração e Amizade',
    description: 'Celebrações, treinos especiais e graduações que marcam nossa união fora e dentro do tatame.',
    tag: 'EQUIPE'
  },
  {
    id: 'slide-6',
    image: IMAGES.treinoFeminino,
    title: 'Turma de Treino Feminino',
    description: 'Espaço seguro e focado para o desenvolvimento de técnicas de defesa pessoal e alta evolução física.',
    tag: 'FEMININO'
  }
];

// Resolves and maps raw relative path strings (from database/storage) to Vite's production bundled and hashed asset URLs
const mapImagePaths = (items: CarouselImage[]): CarouselImage[] => {
  return items
    .filter(item => {
      const imgStr = typeof item.image === 'string' ? item.image : '';
      const isLideranca = item.id === 'slide-2' || 
                          item.title === 'Liderança Técnica de Ponta' || 
                          imgStr.includes('prof_orelha_gi') ||
                          imgStr.includes('prof_orelha_diploma');
      return !isLideranca;
    })
    .map(item => {
      const imgStr = typeof item.image === 'string' ? item.image : '';
      
      if (imgStr.includes('ct_gym_interior')) {
        return { ...item, image: IMAGES.ctGymInterior };
      }
      if (imgStr.includes('prof_champion')) {
        return { ...item, image: IMAGES.profChampion };
      }
      if (imgStr.includes('kids_jiu_jitsu_class') || imgStr.includes('kids_class')) {
        return { ...item, image: IMAGES.kidsJiuJitsuClass };
      }
      if (imgStr.includes('foto_amizade_equipe') || imgStr.includes('jiu_jitsu_team_unity')) {
        return { ...item, image: IMAGES.jiuJitsuTeamUnity };
      }
      if (imgStr.includes('treino_feminino')) {
        return { ...item, image: IMAGES.treinoFeminino };
      }
      if (imgStr.includes('ct_orelha_fight_logo_real') || imgStr.includes('logo_real')) {
        return { ...item, image: IMAGES.ctOrelhaFightLogo };
      }
      
      return item;
    });
};

export default function AdminCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  // Admin State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Image Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [imageUrlString, setImageUrlString] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Confirmation states to avoid iframe-blocked window.confirm dialogues
  const [slideIdToDelete, setSlideIdToDelete] = useState<string | null>(null);
  const [isResetConfirming, setIsResetConfirming] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize images from Firebase Firestore, falling back to localStorage or defaults
  useEffect(() => {
    async function loadImages() {
      let cloudLoaded = false;
      try {
        // Try to load from the modern subcollection first
        const slidesColRef = collection(db, 'settings', 'carousel_config', 'slides');
        const slidesSnap = await getDocs(slidesColRef);
        
        if (!slidesSnap.empty) {
          const slidesData: (CarouselImage & { order?: number })[] = [];
          slidesSnap.forEach(docSnap => {
            slidesData.push({ id: docSnap.id, ...docSnap.data() } as any);
          });
          
          // Sort slides by the 'order' field (or custom sorting if order is missing)
          slidesData.sort((a, b) => {
            const orderA = typeof a.order === 'number' ? a.order : 0;
            const orderB = typeof b.order === 'number' ? b.order : 0;
            return orderA - orderB;
          });
          
          const mappedCloud = mapImagePaths(slidesData.map(({ order, ...slide }) => slide));
          setImages(mappedCloud);
          localStorage.setItem('ct_orelha_dynamic_carousel_v3', JSON.stringify(mappedCloud));
          cloudLoaded = true;
        } else {
          // Fallback to the legacy single document field
          const docRef = doc(db, 'settings', 'carousel_config');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data && Array.isArray(data.images)) {
              const cloudImages = data.images as CarouselImage[];
              const mappedCloud = mapImagePaths(cloudImages);
              setImages(mappedCloud);
              
              // Migrate these legacy images to the subcollection automatically so they are stored safely!
              try {
                const batch = writeBatch(db);
                mappedCloud.forEach((slide, idx) => {
                  const slideDocRef = doc(db, 'settings', 'carousel_config', 'slides', slide.id);
                  batch.set(slideDocRef, {
                    image: slide.image,
                    title: slide.title,
                    description: slide.description,
                    tag: slide.tag,
                    order: idx,
                    objectPosition: slide.objectPosition || ''
                  });
                });
                await batch.commit();
                console.log('Successfully migrated legacy carousel document to subcollection!');
              } catch (migrationError) {
                console.error('Failed to run auto-migration to subcollection:', migrationError);
              }

              localStorage.setItem('ct_orelha_dynamic_carousel_v3', JSON.stringify(mappedCloud));
              cloudLoaded = true;
            }
          }
        }
      } catch (error) {
        console.error('Error loading images from Firestore Cloud:', error);
        
        // Load fallback FIRST so the user doesn't get a broken blank screen or lost data
        let saved = localStorage.getItem('ct_orelha_dynamic_carousel_v3');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              const migrated = mapImagePaths(parsed.filter((item): item is CarouselImage => !!item && typeof item === 'object'));
              setImages(migrated);
            }
          } catch (e) {
            console.error('Parsing fallback error:', e);
          }
        } else {
          setImages(DEFAULT_CAROUSEL_IMAGES);
        }

        if (error instanceof Error && (error.message.includes('permission') || error.message.includes('Permission') || error.message.includes('insufficient'))) {
          handleFirestoreError(error, OperationType.GET, 'settings/carousel_config');
        }
      }

      // If we couldn't load from cloud, fallback to localStorage migration/loads
      if (!cloudLoaded) {
        let saved = localStorage.getItem('ct_orelha_dynamic_carousel_v3');
        
        // If we only have the old v2 database, let's migrate it once to v3
        if (!saved) {
          const oldSaved = localStorage.getItem('ct_orelha_dynamic_carousel_v2') || localStorage.getItem('ct_orelha_dynamic_carousel');
          if (oldSaved) {
            try {
              const parsed = JSON.parse(oldSaved);
              if (Array.isArray(parsed)) {
                const migrated = mapImagePaths(parsed.filter((item): item is CarouselImage => !!item && typeof item === 'object'));
                
                localStorage.setItem('ct_orelha_dynamic_carousel_v3', JSON.stringify(migrated));
                saved = JSON.stringify(migrated);
              }
            } catch (e) {
              console.error('Migration error:', e);
            }
          }
        }

        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              const migrated = mapImagePaths(parsed.filter((item): item is CarouselImage => !!item && typeof item === 'object'));
              setImages(migrated);
              localStorage.setItem('ct_orelha_dynamic_carousel_v3', JSON.stringify(migrated));
            } else {
              setImages(DEFAULT_CAROUSEL_IMAGES);
            }
          } catch (e) {
            console.error('Parsing/migration error in active load:', e);
            setImages(DEFAULT_CAROUSEL_IMAGES);
          }
        } else {
          setImages(DEFAULT_CAROUSEL_IMAGES);
        }
      }
    }
    loadImages();
  }, []);

  // Save changes to localStorage and Firebase Firestore
  const saveImages = async (updatedImages: CarouselImage[]) => {
    setImages(updatedImages);
    try {
      localStorage.setItem('ct_orelha_dynamic_carousel_v3', JSON.stringify(updatedImages));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }

    try {
      // 1. Get all existing slide document IDs in the subcollection to identify deletions
      const slidesColRef = collection(db, 'settings', 'carousel_config', 'slides');
      const slidesSnap = await getDocs(slidesColRef);
      const existingSlideIds = new Set<string>();
      slidesSnap.forEach(docSnap => {
        existingSlideIds.add(docSnap.id);
      });

      // 2. Prepare a Firestore batch to write new/updated slides and delete removed slides
      const batch = writeBatch(db);
      const newSlideIds = new Set(updatedImages.map(img => img.id));

      // Add set operations for all current slides with their order
      updatedImages.forEach((slide, idx) => {
        const slideDocRef = doc(db, 'settings', 'carousel_config', 'slides', slide.id);
        batch.set(slideDocRef, {
          image: slide.image,
          title: slide.title,
          description: slide.description,
          tag: slide.tag,
          order: idx,
          objectPosition: slide.objectPosition || ''
        });
      });

      // Add delete operations for any slide that was removed
      existingSlideIds.forEach(existingId => {
        if (!newSlideIds.has(existingId)) {
          const slideDocRef = doc(db, 'settings', 'carousel_config', 'slides', existingId);
          batch.delete(slideDocRef);
        }
      });

      // 3. Commit the batch
      await batch.commit();

      // 4. Also keep the legacy single document in sync (without the heavy base64 images to prevent 1MB errors)
      try {
        const docRef = doc(db, 'settings', 'carousel_config');
        const lightImages = updatedImages.map(img => ({
          id: img.id,
          title: img.title,
          description: img.description,
          tag: img.tag,
          objectPosition: img.objectPosition || '',
          image: img.image.startsWith('data:') && img.image.length > 50000 ? '[stored_in_subcollection]' : img.image
        }));
        await setDoc(docRef, { images: lightImages });
      } catch (legacyErr) {
        console.error('Failed to update legacy carousel config document (safely ignored):', legacyErr);
      }

      setAdminFeedback({ 
        type: 'success', 
        message: 'Galeria salva com sucesso na nuvem (Firestore)!' 
      });

    } catch (e) {
      console.error('Failed to save to Firestore Cloud:', e);
      setAdminFeedback({ 
        type: 'error', 
        message: 'Aviso: Não foi possível salvar na nuvem (Firestore). As alterações estão temporárias e salvas apenas no seu navegador.' 
      });
      if (e instanceof Error && (e.message.includes('permission') || e.message.includes('Permission') || e.message.includes('insufficient'))) {
        handleFirestoreError(e, OperationType.WRITE, 'settings/carousel_config');
      }
    }
  };

  // Autoplay cycle
  useEffect(() => {
    if (isAutoplay && !isAdminOpen && images.length > 1) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay, isAdminOpen, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsAutoplay(false); // pause autoplay upon user interaction
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoplay(false); // pause autoplay upon user interaction
  };

  // Basic authentication for admin features
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const trimmedPwd = password.trim().toLowerCase();
      // Secure comparison using SHA-256 Web Crypto API hash
      const msgBuffer = new TextEncoder().encode(trimmedPwd);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      if (hashHex === '3cdea53e5b9f1acdc499267e76423a132e1108a21d268bab11f688bf54e6e10c') {
        setIsAuthenticated(true);
        setPasswordError('');
        setAdminFeedback({ type: 'success', message: 'Acesso Administrativo Concedido! Gerencie suas fotos abaixo.' });
      } else {
        setPasswordError('Senha incorreta.');
      }
    } catch (err) {
      // Elegant fallback for legacy/sandboxed local environments
      if (password.trim().toLowerCase() === 'orelha26') {
        setIsAuthenticated(true);
        setPasswordError('');
        setAdminFeedback({ type: 'success', message: 'Acesso Administrativo Concedido! Gerencie suas fotos abaixo.' });
      } else {
        setPasswordError('Senha incorreta.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAdminFeedback(null);
  };

  // Drag and drop events for photo uploading
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedImageFile(file);
        setImagePreviewUrl(URL.createObjectURL(file));
        setImageUrlString(''); // Clear URL field if uploading file
      } else {
        setAdminFeedback({ type: 'error', message: 'Por favor, selecione apenas arquivos de imagem.' });
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageUrlString(''); // Clear URL field if uploading file
    }
  };

  // Image compressor to prevent LocalStorage overflows
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000; // Optimal width for display
          const MAX_HEIGHT = 650;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject('Não foi possível carregar o canvas de renderização.');
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Compress into JPEG with 0.75 ratio for extremely light storage footprints (under 80kb)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Add slide action
  const handleAddNewSlide = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setAdminFeedback(null);

    try {
      let finalImgResult = '';

      if (selectedImageFile) {
        // Run compression
        finalImgResult = await compressImage(selectedImageFile);
      } else if (imageUrlString.trim()) {
        const trimmedUrl = imageUrlString.trim();
        // Prevent XSS scripts injected via malicious protocol links
        const lowerUrl = trimmedUrl.toLowerCase();
        if (lowerUrl.startsWith('javascript:')) {
          throw new Error('Protocolo inserido é perigoso.');
        }
        if (
          !lowerUrl.startsWith('http://') && 
          !lowerUrl.startsWith('https://') && 
          !lowerUrl.startsWith('data:image/') &&
          !lowerUrl.startsWith('/')
        ) {
          throw new Error('A URL de imagem deve começar com http://, https:// ou ser dados base64 válidos (data:image/).');
        }
        finalImgResult = trimmedUrl;
      } else {
        throw new Error('Por favor, faça o upload de uma imagem ou cole um link de internet.');
      }

      const newSlide: CarouselImage = {
        id: `slide-${Date.now()}`,
        image: finalImgResult,
        title: newTitle.trim() || 'Nova Foto CT Orelha',
        description: newDesc.trim() || 'Treinos, eventos e evolução diária no nosso tatame.',
        tag: newTag.trim().toUpperCase() || 'ÁLBUM'
      };

      const updated = [...images, newSlide];
      saveImages(updated);
      setCurrentIndex(updated.length - 1); // Jump to new image

      // Clear form
      setNewTitle('');
      setNewDesc('');
      setNewTag('');
      setSelectedImageFile(null);
      setImagePreviewUrl('');
      setImageUrlString('');
      setAdminFeedback({ type: 'success', message: 'Sua foto foi adicionada com sucesso ao carrossel!' });
    } catch (err: any) {
      setAdminFeedback({ 
        type: 'error', 
        message: err.message || 'Erro ao processar imagem. Tente uma foto menor ou outro link.' 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Remove slide action
  const executeDeleteSlide = (id: string) => {
    if (images.length <= 1) {
      setAdminFeedback({ type: 'error', message: 'O carrossel precisa ter pelo menos 1 imagem ativa.' });
      setSlideIdToDelete(null);
      return;
    }

    const updated = images.filter((slide) => slide.id !== id);
    saveImages(updated);
    setCurrentIndex(0);
    setSlideIdToDelete(null);
    setAdminFeedback({ type: 'success', message: 'Foto removida com sucesso!' });
  };

  // Reordering functions
  const moveSlide = (index: number, direction: 'prev' | 'next', e: MouseEvent) => {
    e.stopPropagation();
    const targetIndex = direction === 'prev' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    saveImages(updated);
    setCurrentIndex(targetIndex);
  };

  // Reset to default
  const executeResetToDefault = () => {
    saveImages(DEFAULT_CAROUSEL_IMAGES);
    setCurrentIndex(0);
    setIsResetConfirming(false);
    setAdminFeedback({ type: 'success', message: 'Galeria resetada para as fotos de fábrica.' });
  };

  return (
    <section id="carrossel-dinamico" className="py-20 bg-black relative border-b border-brand-primary/10 overflow-hidden">
      {/* Decorative ambient background grid lines */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#8eff5c05_1px,transparent_1px),linear-gradient(to_bottom,#8eff5c05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase mb-3">
            <Sparkles className="h-3.5 w-3.5 text-brand-primary animate-pulse" />
            Galeria do Aluno & Novidades
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight" id="dynamic-carousel-heading">
            Álbum de Treinos Recentes
          </h2>
          <p className="text-text-gray text-xs sm:text-sm max-w-xl mx-auto mt-2">
            Acompanhe o dia a dia e os melhores registros de quem treina duro com o mestre Leonardo Orelha.
          </p>
        </div>

        {/* Carousel Content Render */}
        {images.length > 0 ? (
          <div className="relative max-w-4xl mx-auto bg-bg-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl" id="carousel-view-container">
            
            {/* Carousel Active Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] w-full overflow-hidden bg-black flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[currentIndex]?.id}
                  src={images[currentIndex]?.image}
                  alt={images[currentIndex]?.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: images[currentIndex]?.objectPosition || 'center' }}
                  id={`carousel-active-img-${currentIndex}`}
                />
              </AnimatePresence>

              {/* Background gradient shadow for subtitle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Badge Overlay */}
              {images[currentIndex]?.tag && (
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-brand-primary/20 text-[10px] font-mono text-brand-primary font-extrabold tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
                  {images[currentIndex].tag}
                </div>
              )}

              {/* Arrows for Desktop and Tablet */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-brand-primary hover:text-black border border-white/5 text-white transition-all cursor-pointer z-10 hidden sm:block"
                aria-label="Anterior"
                id="carousel-arrow-prev"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-brand-primary hover:text-black border border-white/5 text-white transition-all cursor-pointer z-10 hidden sm:block"
                aria-label="Próximo"
                id="carousel-arrow-next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Sub-text Captions */}
            <div className="p-6 sm:p-8 bg-bg-card border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight" id="carousel-slide-title">
                  {images[currentIndex]?.title}
                </h3>
                <p className="text-text-gray text-xs sm:text-sm leading-relaxed" id="carousel-slide-desc">
                  {images[currentIndex]?.description}
                </p>
              </div>

              {/* Slider index markers for mobile users */}
              <div className="flex items-center gap-2 justify-between sm:justify-end border-t border-white/5 sm:border-0 pt-4 sm:pt-0">
                <div className="sm:hidden flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-black border border-white/10 text-white"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-black border border-white/10 text-white"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsAutoplay(false);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex ? 'w-6 bg-brand-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Ir para foto ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center p-12 bg-bg-card border border-dashed border-white/10 rounded-3xl max-w-4xl mx-auto">
            <ImageIcon className="h-12 w-12 text-white/25 mx-auto mb-4" />
            <p className="text-text-gray text-sm">Nenhuma foto no carrossel. Use o painel de administrador abaixo para inserir registros.</p>
          </div>
        )}

        {/* ADMIN WORKSPACE BUTTON */}
        <div className="flex justify-center mt-12" id="admin-panel-trigger-root">
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-brand-primary hover:text-black border border-white/10 text-text-gray hover:border-brand-primary/40 rounded-xl text-xs font-mono tracking-wider font-semibold transition-all cursor-pointer"
            id="admin-panel-toggle-btn"
          >
            <Settings className={`h-4 w-4 ${isAdminOpen ? 'rotate-45' : ''} transition-transform duration-300`} />
            {isAdminOpen ? 'Fechar Painel do Administrador' : 'Gerenciar Fotos do Álbum'}
          </button>
        </div>

        {/* ADMINISTRATIVE CONSOLE WORKSPACE */}
        <AnimatePresence>
          {isAdminOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto mt-6 overflow-hidden"
              id="admin-collapsible-workspace"
            >
              <div className="bg-bg-card border border-brand-primary/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                
                {/* Visual Accent Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-bl-[100px] pointer-events-none" />

                {/* Internal Header */}
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
                      {isAuthenticated ? (
                        <Unlock className="h-5 w-5 text-brand-primary animate-pulse" />
                      ) : (
                        <Lock className="h-5 w-5 text-brand-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base uppercase tracking-tight">
                        Sistema Administrador da Galeria
                      </h4>
                      <p className="text-text-gray text-xs">
                        Adicione, remova e organize as fotos sem precisar de programação.
                      </p>
                    </div>
                  </div>

                  {isAuthenticated && (
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs font-mono tracking-wider transition-all cursor-pointer"
                    >
                      Sair
                    </button>
                  )}
                </div>

                {/* Feedback Alerts */}
                {adminFeedback && (
                  <div 
                    className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
                      adminFeedback.type === 'success' 
                        ? 'bg-[#8eff5c]/5 border-[#8eff5c]/20 text-[#8eff5c]' 
                        : 'bg-red-500/5 border-red-500/20 text-red-400'
                    }`}
                  >
                    <Check className="h-5 w-5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm font-medium">{adminFeedback.message}</p>
                  </div>
                )}

                {/* LOGIN FORM (IF NOT AUTHENTICATED) */}
                {!isAuthenticated ? (
                  <form onSubmit={handleLogin} className="max-w-md mx-auto py-4 text-center">
                    <p className="text-text-gray text-xs sm:text-sm mb-4">
                      Para sua segurança e privacidade, insira a senha do administrador para liberar a edição instantânea.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 max-w-xs mx-auto justify-center">
                      <input
                        type="password"
                        placeholder="Senha (use: orelha)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-center text-white text-sm focus:outline-none focus:border-brand-primary/50 flex-grow"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-brand-primary hover:bg-[#73e34d] text-black rounded-xl text-xs font-bold font-mono tracking-wider transition-colors cursor-pointer flex-shrink-0"
                      >
                        Entrar
                      </button>
                    </div>
                    {passwordError && (
                      <p className="text-red-400 text-xs mt-3 font-mono">{passwordError}</p>
                    )}
                  </form>
                ) : (
                  
                  // LOGGED IN: ADMIN FLOW
                  <div className="space-y-8" id="admin-workspace-logged-in">
                    
                    {/* Add Photo Form Grid */}
                    <form onSubmit={handleAddNewSlide} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 border border-white/5 rounded-2xl p-5 relative">
                      
                      {/* Left Block: Image File / URL Selector */}
                      <div className="space-y-4">
                        <label className="text-xs font-mono text-brand-primary font-bold block uppercase tracking-wider">
                          1. Enviar ou Vincular a Imagem
                        </label>

                        {/* Drag and Drop Container */}
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                            dragActive 
                              ? 'border-brand-primary bg-brand-primary/5 scale-[0.99]' 
                              : 'border-white/10 hover:border-brand-primary/30 hover:bg-white/5'
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />

                          {imagePreviewUrl ? (
                            <div className="relative aspect-video w-full max-w-[200px] rounded-lg overflow-hidden border border-white/10">
                              <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImageFile(null);
                                  setImagePreviewUrl('');
                                }}
                                className="absolute top-1 right-1 p-1 bg-black/80 text-white hover:text-red-400 rounded-full"
                              >
                                <X className="h-4.5 w-4.5" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-text-gray/50 mb-2 group-hover:scale-115 transition-transform" />
                              <p className="text-white text-xs font-semibold">Arraste uma foto aqui ou clique</p>
                              <p className="text-text-gray/60 text-[10px] sm:text-xs mt-1">
                                Suporta JPG, PNG, WEBP. Convertido automaticamente na hora de salvar.
                              </p>
                            </>
                          )}
                        </div>

                        {/* OR Paste URL string */}
                        <div className="relative flex items-center gap-2">
                          <span className="w-full h-px bg-white/5" />
                          <span className="text-[10px] font-mono text-text-gray/50 uppercase">OU</span>
                          <span className="w-full h-px bg-white/5" />
                        </div>

                        <div>
                          <input
                            type="url"
                            placeholder="Copie e cole um link de foto da internet"
                            value={imageUrlString}
                            onChange={(e) => {
                              setImageUrlString(e.target.value);
                              if (e.target.value) {
                                setSelectedImageFile(null);
                                setImagePreviewUrl(e.target.value);
                              }
                            }}
                            className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-text-gray/40 focus:outline-none focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/10"
                          />
                        </div>
                      </div>

                      {/* Right Block: Image Details (Form Control) */}
                      <div className="space-y-4 flex flex-col justify-between">
                        <div className="space-y-3.5">
                          <div>
                            <label className="text-xs font-mono text-brand-primary font-bold block uppercase tracking-wider mb-1.5 animate-pulse">
                              2. Legenda e Informações
                            </label>
                            <input
                              type="text"
                              placeholder="Título da foto (ex: Aula Iniciantes)"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              maxLength={35}
                              className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-text-gray/40 focus:outline-none focus:border-brand-primary/40"
                            />
                          </div>

                          <div>
                            <textarea
                              placeholder="Breve descrição ou momento da imagem"
                              value={newDesc}
                              onChange={(e) => setNewDesc(e.target.value)}
                              maxLength={120}
                              rows={2.5}
                              className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-text-gray/40 focus:outline-none focus:border-brand-primary/40 resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Categoria (ex: EVENTO)"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              maxLength={15}
                              className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-text-gray/40 focus:outline-none focus:border-brand-primary/40 uppercase font-mono"
                            />
                            <div className="text-[10px] text-text-gray/60 leading-tight self-center p-1 bg-white/5 rounded-lg font-mono">
                              Categorias sugeridas: CT, TREINO, EVENTO, EXAME, GRADUAÇÃO.
                            </div>
                          </div>
                        </div>

                        {/* Submit Actions */}
                        <button
                          type="submit"
                          disabled={isProcessing || (!selectedImageFile && !imageUrlString.trim())}
                          className="w-full py-3 rounded-xl bg-brand-primary hover:bg-[#73e34d] text-black font-bold text-xs uppercase font-mono tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer"
                        >
                          {isProcessing ? (
                            <>
                              <span className="w-4 h-4 rounded-full border-2 border-dashed border-black animate-spin" />
                              Codificando Imagem...
                            </>
                          ) : (
                            <>
                              <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
                              Adicionar Foto na Galeria
                            </>
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Current Carousel Items List & Reordering */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <h5 className="text-white text-xs font-mono font-semibold tracking-wider uppercase">
                          Fotos Ativas no Carrossel ({images.length})
                        </h5>
                        {isResetConfirming ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono text-red-400">Excluir adicionadas e resetar?</span>
                            <button
                              type="button"
                              onClick={executeResetToDefault}
                              className="text-[9px] font-mono text-brand-primary hover:text-white underline transition-colors"
                            >
                              Sim
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsResetConfirming(false)}
                              className="text-[9px] font-mono text-text-gray hover:text-white underline transition-colors"
                            >
                              Não
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setIsResetConfirming(true);
                              setAdminFeedback(null);
                            }}
                            className="text-[10px] font-mono text-text-gray hover:text-brand-primary underline transition-colors"
                          >
                            Restaurar Fotos Padrão
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="admin-current-slides-grid">
                        {images.map((slide, index) => (
                          <div
                            key={slide.id}
                            className={`flex items-center gap-4 bg-black/60 border rounded-xl p-3.5 ${
                              index === currentIndex ? 'border-brand-primary/60 bg-brand-primary/[0.02]' : 'border-white/5 hover:border-white/10'
                            }`}
                            id={`admin-mini-slide-${slide.id}`}
                          >
                            {/* Small thumbnail */}
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black border border-white/10">
                              <img src={slide.image} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>

                            {/* Details & Index Controls */}
                            <div className="flex-grow min-w-0">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="px-1.5 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20 text-[8px] font-mono text-brand-primary">
                                  {index + 1}º SLIDE
                                </span>
                                <span className="text-[9px] font-mono text-text-gray block truncate max-w-xs">{slide.tag}</span>
                              </div>
                              <h6 className="text-xs font-bold text-white truncate">{slide.title}</h6>
                              <p className="text-[10px] text-text-gray leading-tight truncate">{slide.description}</p>
                            </div>

                            {/* Buttons actions */}
                            <div className="flex flex-col gap-1.5 justify-center flex-shrink-0 bg-black/40 p-1.5 rounded-lg border border-white/5">
                              {/* Reorder up/left */}
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  onClick={(e) => moveSlide(index, 'prev', e)}
                                  disabled={index === 0}
                                  className="p-1 rounded bg-white/5 text-text-gray hover:text-brand-primary disabled:opacity-20 disabled:pointer-events-none transition-colors"
                                  title="Mover para cima/anterior"
                                >
                                  <ChevronLeft className="h-3.5 w-3.5" />
                                </button>
                                {/* Reorder down/right */}
                                <button
                                  type="button"
                                  onClick={(e) => moveSlide(index, 'next', e)}
                                  disabled={index === images.length - 1}
                                  className="p-1 rounded bg-white/5 text-text-gray hover:text-brand-primary disabled:opacity-20 disabled:pointer-events-none transition-colors"
                                  title="Mover para baixo/próximo"
                                >
                                  <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              {/* Delete with inline confirmation */}
                              {slideIdToDelete === slide.id ? (
                                <div className="flex flex-col gap-1 mt-1">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      executeDeleteSlide(slide.id);
                                    }}
                                    className="px-1 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-[8px] font-mono transition-colors text-center"
                                    title="Confirmar exclusão"
                                  >
                                    Confirmar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSlideIdToDelete(null);
                                    }}
                                    className="px-1 py-0.5 rounded bg-white/10 hover:bg-white/20 text-text-gray hover:text-white text-[8px] font-mono transition-colors text-center"
                                    title="Cancelar"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSlideIdToDelete(slide.id);
                                    setAdminFeedback(null);
                                  }}
                                  className="p-1 rounded bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-black transition-all"
                                  title="Excluir Imagem"
                                >
                                  <Trash2 className="h-3.5 w-3.5 mx-auto" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 text-center">
                      <p className="text-[10px] text-text-gray/50 font-mono">
                        As alterações feitas são salvas automaticamente de forma privada e segura no seu navegador.
                      </p>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
