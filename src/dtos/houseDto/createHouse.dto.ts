export interface LocationDto {
  type: "Point";
  coordinates: [number, number];
}

export interface CreateHouseDTO {
  user_id: string;
  price: number;
  location: LocationDto;
}
