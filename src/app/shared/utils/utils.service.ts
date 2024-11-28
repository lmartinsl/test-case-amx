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

  formatReal(value: number): string | undefined {
    if (isNaN(value) || typeof value !== 'number') {
      return undefined;
    }
    try {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    } catch (e) {
      return undefined;
    }
  }

  getProductCategories(): string[] {
    return [
      'Eletrônicos',
      'Roupas',
      'Alimentos',
      'Beleza e Cuidados',
      'Casa e Decoração',
      'Brinquedos',
      'Esportes',
      'Livros',
      'Automotivo',
      'Saúde',
      'Móveis',
    ];
  }
}
