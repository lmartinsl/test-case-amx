import { Injectable } from '@angular/core';
import { ProfileEnum } from 'src/app/core/enums/profile.enum';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  profileMap(profile: ProfileEnum): string {
    const profileMap = new Map<ProfileEnum, string>([
      [ProfileEnum.ADMIN, 'Perfil: Administrador'],
      [ProfileEnum.SELLER, 'Perfil: Vendedor'],
      [ProfileEnum.CLIENT, 'Perfil: Cliente'],
    ]);

    return profileMap.get(profile) || 'Perfil desconhecido';
  }
}
