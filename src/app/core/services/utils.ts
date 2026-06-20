import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Utils {
  getAgeOfDateOfBirth(dateofBirthString: string): string {
    const [day, month, year] = dateofBirthString.split('-').map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const currentMonth = currentDate.getMonth() - dateOfBirth.getMonth();

    if (currentMonth < 0 || (currentMonth === 0 && currentDate.getDate() < dateOfBirth.getDate())) {
      age--;
    }

    return age.toString();
  }
}
