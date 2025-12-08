import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus, PaymentMethod } from '../entities/order.entity';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiPropertyOptional({ description: "Status do pedido", enum: OrderStatus, example: OrderStatus.PENDING_PAYMENT, default: OrderStatus.PENDING_PAYMENT })
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus;

    @ApiProperty({ description: "Forma de pagamento", enum: PaymentMethod, example: PaymentMethod.PIX })
    @IsEnum(PaymentMethod)
    methodPayment: PaymentMethod;

    @ApiProperty({ description: "Valor total do pedido", example: 199.90 })
    @IsNumber()
    @IsPositive()
    value: number;

    @ApiPropertyOptional({ description: "Data do pagamento", example: "2025-11-20T15:30:00.000Z" })
    @IsOptional()
    @IsDateString()
    datePayment?: Date;
}
