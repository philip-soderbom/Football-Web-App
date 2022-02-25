import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TeamComponent } from './components/team/team.component';
import { FormComponent } from './components/form/form.component';
import { StartComponent } from './components/start/start.component';
import { SquadComponent } from './components/squad/squad.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';

const appRoutes: Routes = [
  {path: '', component: StartComponent},
  {path: 'squad', component: SquadComponent},
  {path: 'player/:id', component: PlayerComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamComponent,
    StartComponent,
    FormComponent,
    SquadComponent,
    PlayerCardComponent,
    PlayerComponent,
    PlayerStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
