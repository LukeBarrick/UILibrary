import { Component, OnInit } from '@angular/core';

interface StatusType {
  value: string;
  display: string;
  description: string;
}

interface SampleUser {
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface SampleOrder {
  id: string;
  customer: string;
  amount: number;
  date: string;
  status: string;
}

interface SampleTask {
  title: string;
  assignee: string;
  dueDate: string;
  status: string;
}

interface SystemService {
  name: string;
  description: string;
  icon: string;
  status: string;
}

interface DemoItem {
  name: string;
  description: string;
  status: string;
}

@Component({
    selector: 'app-status-tag-showcase',
    templateUrl: './status-tag-showcase.component.html',
    styleUrls: ['./status-tag-showcase.component.css'],
    standalone: false
})
export class StatusTagShowcaseComponent implements OnInit {
  selectedStatus: string = 'success';
  statusText: string = 'Active';
  lastAction: string = '';
  
  availableStatuses: StatusType[] = [
    { value: 'success', display: 'Success', description: 'Completed, approved, active states' },
    { value: 'warning', display: 'Warning', description: 'Attention required, pending review' },
    { value: 'error', display: 'Error', description: 'Failed, rejected, critical issues' },
    { value: 'info', display: 'Info', description: 'Informational, in progress' },
    { value: 'primary', display: 'Primary', description: 'Default, important items' },
    { value: 'secondary', display: 'Secondary', description: 'Secondary information' },
    { value: 'inactive', display: 'Inactive', description: 'Disabled, offline, archived' },
    { value: 'pending', display: 'Pending', description: 'Awaiting action or approval' }
  ];

  sampleUsers: SampleUser[] = [
    { name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'success', lastLogin: '2 hours ago' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'User', status: 'warning', lastLogin: '1 day ago' },
    { name: 'Mike Wilson', email: 'mike@example.com', role: 'User', status: 'success', lastLogin: '30 min ago' },
    { name: 'Lisa Brown', email: 'lisa@example.com', role: 'Moderator', status: 'inactive', lastLogin: '1 week ago' },
    { name: 'David Lee', email: 'david@example.com', role: 'User', status: 'pending', lastLogin: 'Never' }
  ];

  sampleOrders: SampleOrder[] = [
    { id: '12345', customer: 'Alice Cooper', amount: 299.99, date: '2024-01-15', status: 'success' },
    { id: '12346', customer: 'Bob Martin', amount: 149.50, date: '2024-01-16', status: 'warning' },
    { id: '12347', customer: 'Carol White', amount: 399.99, date: '2024-01-17', status: 'info' },
    { id: '12348', customer: 'Dan Black', amount: 199.99, date: '2024-01-18', status: 'error' }
  ];

  sampleTasks: SampleTask[] = [
    { title: 'Update user documentation', assignee: 'John Smith', dueDate: '2024-01-20', status: 'success' },
    { title: 'Fix login authentication bug', assignee: 'Sarah Johnson', dueDate: '2024-01-18', status: 'error' },
    { title: 'Design new homepage layout', assignee: 'Mike Wilson', dueDate: '2024-01-22', status: 'info' },
    { title: 'Review security protocols', assignee: 'Lisa Brown', dueDate: '2024-01-25', status: 'warning' },
    { title: 'Implement payment gateway', assignee: 'David Lee', dueDate: '2024-01-30', status: 'pending' }
  ];

  systemServices: SystemService[] = [
    { name: 'Database', description: 'Primary data storage', icon: 'icon-accommodation', status: 'success' },
    { name: 'API Gateway', description: 'Service routing and authentication', icon: 'icon-air', status: 'warning' },
    { name: 'Cache Layer', description: 'Redis caching service', icon: 'icon-accommodation', status: 'success' },
    { name: 'File Storage', description: 'Document and media storage', icon: 'icon-air', status: 'error' },
    { name: 'Notification Service', description: 'Email and push notifications', icon: 'icon-accommodation', status: 'info' }
  ];

  demoItems: DemoItem[] = [
    { name: 'Project Alpha', description: 'Main development project', status: 'success' },
    { name: 'Beta Testing', description: 'User acceptance testing phase', status: 'warning' },
    { name: 'Documentation', description: 'Technical documentation update', status: 'info' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  getStatusDisplay(status: string): string {
    const statusMap: { [key: string]: string } = {
      'success': 'Active',
      'warning': 'Warning',
      'error': 'Failed',
      'info': 'Processing',
      'primary': 'Default',
      'secondary': 'Draft',
      'inactive': 'Inactive',
      'pending': 'Pending'
    };
    return statusMap[status] || status;
  }

  getOrderStatusDisplay(status: string): string {
    const orderStatusMap: { [key: string]: string } = {
      'success': 'Delivered',
      'warning': 'Pending',
      'error': 'Cancelled',
      'info': 'Processing',
      'pending': 'Awaiting Payment'
    };
    return orderStatusMap[status] || status;
  }

  getTaskStatusDisplay(status: string): string {
    const taskStatusMap: { [key: string]: string } = {
      'success': 'Completed',
      'warning': 'Review Needed',
      'error': 'Blocked',
      'info': 'In Progress',
      'pending': 'Not Started'
    };
    return taskStatusMap[status] || status;
  }

  getServiceStatusDisplay(status: string): string {
    const serviceStatusMap: { [key: string]: string } = {
      'success': 'Online',
      'warning': 'Degraded',
      'error': 'Offline',
      'info': 'Maintenance',
      'pending': 'Starting'
    };
    return serviceStatusMap[status] || status;
  }

  addRandomItem(): void {
    const names = ['Project Gamma', 'System Update', 'Security Audit', 'Performance Test', 'User Survey'];
    const descriptions = [
      'New initiative for Q2', 
      'Critical system maintenance', 
      'Security compliance check', 
      'Load testing procedures', 
      'User feedback collection'
    ];
    const statuses = ['success', 'warning', 'error', 'info', 'pending'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    this.demoItems.push({
      name: randomName,
      description: randomDescription,
      status: randomStatus
    });
    
    this.lastAction = `Added new item: ${randomName}`;
  }

  updateAllStatuses(): void {
    const statuses = ['success', 'warning', 'error', 'info', 'pending'];
    
    this.demoItems.forEach(item => {
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      item.status = newStatus;
    });
    
    this.lastAction = `Updated ${this.demoItems.length} item statuses randomly`;
  }

  cycleItemStatus(index: number): void {
    const statuses = ['success', 'warning', 'error', 'info', 'pending'];
    const currentStatus = this.demoItems[index].status;
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    this.demoItems[index].status = statuses[nextIndex];
    this.lastAction = `Cycled ${this.demoItems[index].name} status to ${this.getStatusDisplay(statuses[nextIndex])}`;
  }

  removeItem(index: number): void {
    const itemName = this.demoItems[index].name;
    this.demoItems.splice(index, 1);
    this.lastAction = `Removed item: ${itemName}`;
  }

  resetDemo(): void {
    this.demoItems = [
      { name: 'Project Alpha', description: 'Main development project', status: 'success' },
      { name: 'Beta Testing', description: 'User acceptance testing phase', status: 'warning' },
      { name: 'Documentation', description: 'Technical documentation update', status: 'info' }
    ];
    this.lastAction = 'Demo reset to default state';
  }

  getStatusStats(): any[] {
    const statusCounts: { [key: string]: number } = {};
    
    this.demoItems.forEach(item => {
      statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
    });
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      label: this.getStatusDisplay(status),
      count
    }));
  }

  logCurrentState(): void {
    console.log('Status Tag Showcase State:', {
      selectedStatus: this.selectedStatus,
      statusText: this.statusText,
      demoItems: this.demoItems,
      statusStats: this.getStatusStats()
    });
  }

  exportStatusData(): void {
    const data = {
      users: this.sampleUsers,
      orders: this.sampleOrders,
      tasks: this.sampleTasks,
      services: this.systemServices,
      demoItems: this.demoItems,
      statistics: this.getStatusStats()
    };
    
    console.log('Status Data Export:', data);
    this.lastAction = 'Status data exported to console';
  }
}