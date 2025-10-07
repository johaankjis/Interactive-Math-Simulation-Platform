export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== "undefined" && window.performance) {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`[v0] Performance: ${name} took ${(end - start).toFixed(2)}ms`)
  } else {
    fn()
  }
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// Lazy load images with Intersection Observer
export function lazyLoadImage(img: HTMLImageElement) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement
          if (image.dataset.src) {
            image.src = image.dataset.src
            image.removeAttribute("data-src")
            observer.unobserve(image)
          }
        }
      })
    })

    observer.observe(img)
  } else {
    // Fallback for browsers without IntersectionObserver
    if (img.dataset.src) {
      img.src = img.dataset.src
    }
  }
}
