import { TestBed } from '@angular/core/testing';
import { ProfileEnum } from 'src/app/core/enums/profile.enum';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('profileMap', () => {
    it('should return "Perfil: Administrador" when profile is ADMIN', () => {
      expect(service.profileMap(ProfileEnum.ADMIN)).toBe(
        'Perfil: Administrador'
      );
    });

    it('should return "Perfil: Vendedor" when profile is SELLER', () => {
      expect(service.profileMap(ProfileEnum.SELLER)).toBe('Perfil: Vendedor');
    });

    it('should return "Perfil: Cliente" when profile is CLIENT', () => {
      expect(service.profileMap(ProfileEnum.CLIENT)).toBe('Perfil: Cliente');
    });

    it('should return "Perfil desconhecido" for an unknown profile', () => {
      const invalidProfile = 'UNKNOWN' as ProfileEnum; // ou qualquer valor que não seja do tipo ProfileEnum
      expect(service.profileMap(invalidProfile)).toBe('Perfil desconhecido');
    });
  });

  describe('formatReal', () => {
    it('should return formatted value in BRL when a valid number is provided', () => {
      const value = 1234.56;
      const formattedValue = service.formatReal(value);
      
      expect(formattedValue).toContain('R$');
      expect(formattedValue).toMatch(/\d{1,3}(\.\d{3})*,\d{2}/);
    });
  
    it('should return undefined when an invalid value is provided', () => {
      expect(service.formatReal(NaN)).toBeUndefined();
      expect(service.formatReal(null as any)).toBeUndefined();
      expect(service.formatReal(undefined as any)).toBeUndefined();
      expect(service.formatReal('invalid' as any)).toBeUndefined();
    });
  });
  

  describe('getProductCategories', () => {
    it('should return a list of product categories', () => {
      const expectedCategories = [
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
      expect(service.getProductCategories()).toEqual(expectedCategories);
    });
  });
});
