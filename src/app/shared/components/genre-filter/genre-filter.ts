import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-genre-filter',
  imports: [],
  templateUrl: './genre-filter.html',
  styleUrl: './genre-filter.css',
})
export class GenreFilter {
  genres = input.required<string[]>();
  genresChange = output<string[]>();

  selected: string[] = [];

  toggle(genre: string): void {
    if (this.selected.includes(genre)) {
      this.selected = this.selected.filter((g) => g !== genre);
    } else {
      this.selected = [...this.selected, genre];
    }

    this.genresChange.emit(this.selected);
  }

  isSelected(genre: string): boolean {
    return this.selected.includes(genre);
  }

  clear(): void {
    this.selected = [];
    this.genresChange.emit(this.selected);
  }
}
