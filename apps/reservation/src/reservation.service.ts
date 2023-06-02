import { Body, Delete, Get, Injectable, Patch, Post } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository){}
  
  create(createReservationDto: CreateReservationDto ){
    return this.reservationRepository.create({
      ...createReservationDto,
      userId: "1234"
    })
  }


  findall(){
    return this.reservationRepository.find({});
  }

  findone(_id: string){
    return this.reservationRepository.findOne({_id})
  }

  update(_id: string, updateReservationDto: UpdateReservationDto){
    return this.reservationRepository.findOneAndUpdate({_id}, {$set: updateReservationDto})
  }


  remove(_id: string){
    return this.reservationRepository.findOneAndDelete({_id});
  }



}
