import { IsString, IsOptional } from 'class-validator';

export class SearchProductDTO {
    @IsString()
    @IsOptional()
    searchTerm?: string;
}
