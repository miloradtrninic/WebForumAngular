import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ThreadComponent } from './thread/thread.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { HamburgerDirective } from './directives/hamburger.directive';
import { SectionlistComponent } from './sectionlist/sectionlist.component';
import { SectionComponent } from './sectionlist/section/section.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {SectionService} from './services/section.service';
import {HttpModule} from '@angular/http';
import {ThreadService} from './services/thread.service';
import { CommentTreeComponent } from './thread/comment-tree/comment-tree.component';
import {CommentService} from './services/comment.service';
import { RegistrationComponent } from './registration/registration.component';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { LoginComponent } from './login/login.component';
import {UserService} from './services/user.service';
import {DatePipe} from '@angular/common';
import {SubscriberguardService} from './services/guard/subscriberguard.service';
import {RegularUserGuard} from './services/guard/regularuser.service';
import {ModeratorGuardService} from './services/guard/moderator-guard.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NewThreadComponent } from './thread/new-thread/new-thread.component';
import { AdminUsersComponent } from './admin-panel/admin-users/admin-users.component';
import {AdminGuardService} from './services/guard/admin-guard.service';
import { HomeComponent } from './admin-panel/home/home.component';
import { AdminThreadsComponent } from './admin-panel/admin-threads/admin-threads.component';
import { AdminSectionsComponent } from './admin-panel/admin-sections/admin-sections.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubSectionsComponent } from './user-profile/sub-sections/sub-sections.component';
import { MessagesComponent } from './user-profile/messages/messages.component';
import { MessageInboxComponent } from './user-profile/messages/message-inbox/message-inbox.component';
import { MessageOutboxComponent } from './user-profile/messages/message-outbox/message-outbox.component';
import { MessageSendComponent } from './user-profile/messages/message-send/message-send.component';
import {MessageService} from './services/message.service';
import { UserTicketComponent } from './user-profile/user-ticket/user-ticket.component';
import {TicketService} from './services/ticket.service';
import { AdminTicketsComponent } from './admin-panel/admin-tickets/admin-tickets.component';
import { ResolvedTicketsComponent } from './admin-panel/admin-tickets/resolved-tickets/resolved-tickets.component';
import { UnresolvedTicketsComponent } from './admin-panel/admin-tickets/unresolved-tickets/unresolved-tickets.component';
import { ModalComponent } from './modal/modal.component';
import { NewSectionComponent } from './sectionlist/new-section/new-section.component';
import { CommentEditComponent } from './modal/comment-edit/comment-edit.component';
import { SearchComponent } from './search/search.component';
import { SuggestsComponent } from './thread/suggests/suggests.component';
import { PublicComponent } from './user-profile/public/public.component';



@NgModule({
  declarations: [
    AppComponent,
    ThreadComponent,
    HeaderComponent,
    DropdownDirective,
    HamburgerDirective,
    SectionlistComponent,
    SectionComponent,
    CommentTreeComponent,
    RegistrationComponent,
    EqualValidatorDirective,
    LoginComponent,
    AdminPanelComponent,
    NewThreadComponent,
    AdminUsersComponent,
    HomeComponent,
    AdminThreadsComponent,
    AdminSectionsComponent,
    UserProfileComponent,
    SubSectionsComponent,
    MessagesComponent,
    MessageInboxComponent,
    MessageOutboxComponent,
    MessageSendComponent,
    UserTicketComponent,
    AdminTicketsComponent,
    ResolvedTicketsComponent,
    UnresolvedTicketsComponent,
    ModalComponent,
    NewSectionComponent,
    CommentEditComponent,
    SearchComponent,
    SuggestsComponent,
    PublicComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [SectionService, ThreadService, CommentService, UserService, DatePipe,
    SubscriberguardService, RegularUserGuard, ModeratorGuardService, AdminGuardService, UserProfileComponent,
    MessageService, TicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
