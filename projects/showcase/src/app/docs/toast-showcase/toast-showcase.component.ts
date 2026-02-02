import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ToastConfig {
  type: string;
  title: string;
  message: string;
  duration: number;
  position: string;
  showIcon: boolean;
  closable: boolean;
}

interface Toast {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  duration?: number;
  persistent?: boolean;
}

@Component({
    selector: 'app-toast-showcase',
    templateUrl: './toast-showcase.component.html',
    styleUrls: ['./toast-showcase.component.css'],
    standalone: false
})
export class ToastShowcaseComponent implements OnInit {
  sampleForm: FormGroup;
  showPreview: boolean = false;
  generatedCode: string = '';
  
  toastConfig: ToastConfig = {
    type: 'success',
    title: 'Success',
    message: 'Your action was completed successfully!',
    duration: 5000,
    position: 'top-right',
    showIcon: true,
    closable: true
  };

  activeToasts: Toast[] = [];
  toastQueue: Toast[] = [];
  totalToastsShown: number = 0;
  maxConcurrentToasts: number = 3;
  
  private toastIdCounter: number = 1;

  constructor(private formBuilder: FormBuilder) {
    this.sampleForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Initialize with some sample active toasts for demonstration
    this.activeToasts = [
      {
        id: 'demo-1',
        type: 'info',
        title: 'Welcome',
        message: 'Welcome to the Toast Showcase!',
        timestamp: new Date(Date.now() - 30000) // 30 seconds ago
      }
    ];
    this.totalToastsShown = 1;
  }

  showToast(type: string): void {
    const toastMessages = {
      success: { title: 'Success', message: 'Operation completed successfully!' },
      warning: { title: 'Warning', message: 'Please review your input before continuing.' },
      error: { title: 'Error', message: 'An error occurred. Please try again.' },
      info: { title: 'Information', message: 'Here is some important information for you.' }
    };
    
    const config = toastMessages[type as keyof typeof toastMessages];
    
    const toast: Toast = {
      id: `toast-${this.toastIdCounter++}`,
      type,
      title: config.title,
      message: config.message,
      timestamp: new Date()
    };
    
    this.addToast(toast);
  }

  generateToast(): void {
    const toast: Toast = {
      id: `generated-${this.toastIdCounter++}`,
      type: this.toastConfig.type,
      title: this.toastConfig.title,
      message: this.toastConfig.message,
      timestamp: new Date(),
      duration: this.toastConfig.duration,
      persistent: this.toastConfig.duration === 0
    };
    
    this.addToast(toast);
    
    // Generate the code
    this.generatedCode = this.generateToastCode();
  }

  previewToast(): void {
    this.showPreview = true;
    this.generatedCode = this.generateToastCode();
  }

  resetToastConfig(): void {
    this.toastConfig = {
      type: 'success',
      title: 'Success',
      message: 'Your action was completed successfully!',
      duration: 5000,
      position: 'top-right',
      showIcon: true,
      closable: true
    };
    this.showPreview = false;
    this.generatedCode = '';
  }

  getToastIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'success': 'icon-check',
      'warning': 'icon-warning',
      'error': 'icon-close',
      'info': 'icon-info'
    };
    return iconMap[type] || 'icon-info';
  }

  generateToastCode(): string {
    return `// TypeScript
const toastConfig = {
  type: '${this.toastConfig.type}',
  title: '${this.toastConfig.title}',
  message: '${this.toastConfig.message}',
  duration: ${this.toastConfig.duration},
  position: '${this.toastConfig.position}',
  showIcon: ${this.toastConfig.showIcon},
  closable: ${this.toastConfig.closable}
};

// HTML Template
<div class="toast toast-${this.toastConfig.type}" role="alert">
  <div class="toast-header">
    ${this.toastConfig.showIcon ? `<uilibrary-icon name="${this.getToastIcon(this.toastConfig.type)}" size="small"></uilibrary-icon>` : ''}
    <strong class="me-auto">${this.toastConfig.title}</strong>
    <small class="text-muted">now</small>
    ${this.toastConfig.closable ? '<button type="button" class="btn-close"></button>' : ''}
  </div>
  <div class="toast-body">
    ${this.toastConfig.message}
  </div>
</div>`;
  }

  addMultipleToasts(): void {
    const toasts = [
      { type: 'info', title: 'Processing', message: 'Starting data synchronization...' },
      { type: 'warning', title: 'Notice', message: 'This operation may take a few minutes.' },
      { type: 'success', title: 'Complete', message: 'All items have been processed successfully.' }
    ];
    
    toasts.forEach((config, index) => {
      setTimeout(() => {
        const toast: Toast = {
          id: `batch-${this.toastIdCounter++}`,
          ...config,
          timestamp: new Date()
        };
        this.addToast(toast);
      }, index * 1000); // Stagger the toasts
    });
  }

  showPriorityToast(): void {
    const toast: Toast = {
      id: `priority-${this.toastIdCounter++}`,
      type: 'error',
      title: 'Critical Alert',
      message: 'Immediate attention required! System security breach detected.',
      timestamp: new Date(),
      persistent: true
    };
    
    // Priority toasts go to the front of the queue
    if (this.activeToasts.length < this.maxConcurrentToasts) {
      this.displayToast(toast);
    } else {
      this.toastQueue.unshift(toast); // Add to front of queue
    }
  }

  showPersistentToast(): void {
    const toast: Toast = {
      id: `persistent-${this.toastIdCounter++}`,
      type: 'warning',
      title: 'Important',
      message: 'This message will remain visible until you dismiss it manually.',
      timestamp: new Date(),
      persistent: true
    };
    
    this.addToast(toast);
  }

  clearAllToasts(): void {
    this.activeToasts = [];
    this.toastQueue = [];
  }

  dismissToast(index: number): void {
    this.activeToasts.splice(index, 1);
    this.processQueue();
  }

  getToastAge(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
  }

  submitForm(): void {
    if (this.sampleForm.valid) {
      // Simulate form submission
      const toast: Toast = {
        id: `form-${this.toastIdCounter++}`,
        type: 'success',
        title: 'Form Submitted',
        message: `Thank you, ${this.sampleForm.value.name}! Your form has been submitted successfully.`,
        timestamp: new Date()
      };
      
      this.addToast(toast);
      this.sampleForm.reset();
    } else {
      const toast: Toast = {
        id: `form-error-${this.toastIdCounter++}`,
        type: 'warning',
        title: 'Form Validation',
        message: 'Please fill in all required fields correctly before submitting.',
        timestamp: new Date()
      };
      
      this.addToast(toast);
    }
  }

  simulateError(): void {
    const toast: Toast = {
      id: `error-${this.toastIdCounter++}`,
      type: 'error',
      title: 'Submission Failed',
      message: 'Network error occurred. Please check your connection and try again.',
      timestamp: new Date(),
      duration: 8000 // Longer duration for errors
    };
    
    this.addToast(toast);
  }

  performAction(action: string): void {
    const actionConfig = {
      save: { type: 'success', title: 'Saved', message: 'Document saved successfully!' },
      export: { type: 'info', title: 'Exporting', message: 'Data export started. You will be notified when complete.' },
      backup: { type: 'warning', title: 'Backup', message: 'Backup process initiated. Please do not close the application.' },
      sync: { type: 'info', title: 'Syncing', message: 'Synchronizing data with remote server...' }
    };
    
    const config = actionConfig[action as keyof typeof actionConfig];
    
    if (config) {
      const toast: Toast = {
        id: `action-${action}-${this.toastIdCounter++}`,
        ...config,
        timestamp: new Date()
      };
      
      this.addToast(toast);
    }
  }

  simulateSystemEvent(eventType: string): void {
    const eventConfig = {
      connection: { type: 'error', title: 'Connection Lost', message: 'Unable to connect to server. Retrying...' },
      update: { type: 'info', title: 'Update Available', message: 'A new version is available. Click here to update.' },
      storage: { type: 'warning', title: 'Low Storage', message: 'Storage space is running low. Please free up some space.' },
      maintenance: { type: 'info', title: 'Maintenance', message: 'Scheduled maintenance will begin in 10 minutes.' }
    };
    
    const config = eventConfig[eventType as keyof typeof eventConfig];
    
    if (config) {
      const toast: Toast = {
        id: `event-${eventType}-${this.toastIdCounter++}`,
        ...config,
        timestamp: new Date()
      };
      
      this.addToast(toast);
    }
  }

  private addToast(toast: Toast): void {
    if (this.activeToasts.length < this.maxConcurrentToasts) {
      this.displayToast(toast);
    } else {
      this.toastQueue.push(toast);
    }
  }

  private displayToast(toast: Toast): void {
    this.activeToasts.push(toast);
    this.totalToastsShown++;
    
    // Auto-dismiss non-persistent toasts
    if (!toast.persistent) {
      const duration = toast.duration || 5000;
      setTimeout(() => {
        const index = this.activeToasts.findIndex(t => t.id === toast.id);
        if (index > -1) {
          this.dismissToast(index);
        }
      }, duration);
    }
  }

  private processQueue(): void {
    while (this.toastQueue.length > 0 && this.activeToasts.length < this.maxConcurrentToasts) {
      const nextToast = this.toastQueue.shift();
      if (nextToast) {
        this.displayToast(nextToast);
      }
    }
  }
}