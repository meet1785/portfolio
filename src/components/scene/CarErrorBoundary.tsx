import React, { Component, ReactNode } from 'react';
import { CarFallback } from './CarFallback';

export class CarErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Failed to load 3D Car Model:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <CarFallback />;
    }
    return this.props.children;
  }
}
