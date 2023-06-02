import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto){ 
    return this.reservationService.create(createReservationDto)
  }

  @Get()
  findAll() {
    return this.reservationService.findall();
  }

  @Get(":id")
  findOne(@Param('id') id: string){
    return this.reservationService.findone(id)
  }

  @Patch(":id")
  update(@Param('id') id: string, @Body() updatereservationDto: UpdateReservationDto){
    return this.reservationService.update(id, updatereservationDto)
  }


  @Delete(':id')
  delete(@Param('id') id: string){
    return this.reservationService.remove(id);
  }
}
