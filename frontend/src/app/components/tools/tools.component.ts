import { Component } from '@angular/core';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [FilterPipe],
})
export class ToolsComponent {
  filterEventos = '';
}
