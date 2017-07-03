import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SectionlistComponent} from 'app/sectionlist/sectionlist.component';
import {SectionComponent} from 'app/sectionlist/section/section.component';
import {ThreadComponent} from '../thread/thread.component';
import {LoginComponent} from '../login/login.component';
import {RegistrationComponent} from '../registration/registration.component';
import {SubscriberguardService} from '../services/guard/subscriberguard.service';
import {RegularUserGuard} from 'app/services/guard/regularuser.service';
import {NewThreadComponent} from '../thread/new-thread/new-thread.component';
import {AdminPanelComponent} from '../admin-panel/admin-panel.component';
import {ModeratorGuardService} from '../services/guard/moderator-guard.service';
import {AdminUsersComponent} from '../admin-panel/admin-users/admin-users.component';
import {AdminGuardService} from '../services/guard/admin-guard.service';
import {HomeComponent} from 'app/admin-panel/home/home.component';
import {AdminThreadsComponent} from '../admin-panel/admin-threads/admin-threads.component';
import {AdminSectionsComponent} from '../admin-panel/admin-sections/admin-sections.component';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {SubSectionsComponent} from '../user-profile/sub-sections/sub-sections.component';
import {MessagesComponent} from '../user-profile/messages/messages.component';
import {MessageInboxComponent} from '../user-profile/messages/message-inbox/message-inbox.component';
import {MessageOutboxComponent} from '../user-profile/messages/message-outbox/message-outbox.component';
import {MessageSendComponent} from '../user-profile/messages/message-send/message-send.component';
import {UserTicketComponent} from '../user-profile/user-ticket/user-ticket.component';
import {AdminTicketsComponent} from '../admin-panel/admin-tickets/admin-tickets.component';
import {UnresolvedTicketsComponent} from '../admin-panel/admin-tickets/unresolved-tickets/unresolved-tickets.component';
import {ResolvedTicketsComponent} from '../admin-panel/admin-tickets/resolved-tickets/resolved-tickets.component';
import {NewSectionComponent} from '../sectionlist/new-section/new-section.component';
import {SearchComponent} from "app/search/search.component";
import {PublicComponent} from '../user-profile/public/public.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/sections', pathMatch: 'full' },
  { path: 'sections', component: SectionlistComponent },
  { path: 'section/:id', component: SectionComponent},
  { path: 'sections/newsection', component: NewSectionComponent, canActivate: [ModeratorGuardService]},
  { path: 'threads', component: SectionComponent},
  { path: 'thread/:id', component: ThreadComponent},
  { path: 'login', component: LoginComponent, canActivate : [RegularUserGuard]},
  { path: 'register', component: RegistrationComponent, canActivate : [RegularUserGuard]},
  { path: 'search', component: SearchComponent},
  { path: 'section/:id/newthread', component: NewThreadComponent, canActivate : [SubscriberguardService] },
  { path: 'adminPanel', component: AdminPanelComponent, canActivate : [ModeratorGuardService],
    children: [
      {path: '', component: HomeComponent, canActivate: [ModeratorGuardService]},
      {path: 'users', component: AdminUsersComponent, canActivate: [AdminGuardService]},
      {path: 'threads', component: AdminThreadsComponent, canActivate: [ModeratorGuardService]},
      {path: 'sections', component: AdminSectionsComponent, canActivate: [ModeratorGuardService]},
      {path: 'sections', component: AdminSectionsComponent, canActivate: [ModeratorGuardService]},
      {path: 'tickets', component: AdminTicketsComponent, canActivate: [ModeratorGuardService], children: [
        {path: '', component: UnresolvedTicketsComponent, canActivate: [ModeratorGuardService]},
        {path: 'resolved', component: ResolvedTicketsComponent, canActivate: [ModeratorGuardService]}
      ]},
    ]
  },
  { path: 'user/:id', component: PublicComponent, canActivate: [SubscriberguardService]},
  { path: 'profile', component: UserProfileComponent, canActivate: [SubscriberguardService], children: [
    {path: '', component: HomeComponent, canActivate: [SubscriberguardService]},
    {path: 'threads', component: AdminThreadsComponent, canActivate: [SubscriberguardService]},
    {path: 'subsections', component: SubSectionsComponent, canActivate: [SubscriberguardService]},
    {path: 'messages', component: MessagesComponent, canActivate: [SubscriberguardService], children: [
      {path: '', component: MessageInboxComponent, canActivate: [SubscriberguardService]},
      {path: 'outbox', component: MessageOutboxComponent, canActivate: [SubscriberguardService]},
      {path: 'send', component: MessageSendComponent, canActivate: [SubscriberguardService]},
    ]},
    {path: 'tickets', component: UserTicketComponent, canActivate: [SubscriberguardService]}
  ]}

  /*  { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent },*/
/*  { path: '/not-found', component: SectionlistComponent}, // TODO impelentiraj not found stranicu
  { path: '**', redirectTo: '/not-found' }*/
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  exports : [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
