/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export interface AudienceSegment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ageRange?: string;
  focus: string[];
}

export interface Differentiator {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}
