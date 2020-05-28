import { Routes } from '@angular/router';

import { NoticeTerminationComponent } from '../../notice-termination/notice-termination.component'; 
import { NoticeTerminationSaveComponent } from '../../notice-termination-save/notice-termination-save.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'notice-termination', component: NoticeTerminationComponent},
    { path: 'notice-termination-save', component: NoticeTerminationSaveComponent}
];