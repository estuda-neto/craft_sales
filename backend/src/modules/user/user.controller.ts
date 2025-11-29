import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, Req } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { CreateUserDto, EmailResetDto, ResetPasswordDto, UpdateUserDto, UpdateUserPasswordDto, } from './dto';
import { JwtAuthGuard } from './utils/guards/jwt.guard';
import { RolesGuard } from './utils/guards/roles.guard';
import { Roles } from './utils/decorators/roles.decorator';
import * as fs from 'fs/promises';
import { extname, join } from 'path';
import { UserService } from './user.service';
import { ApiError } from 'src/common/errors/apierror.class';
import type { FastifyRequest } from 'fastify';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { password, repeatPassword } = createUserDto;
    if (password !== repeatPassword) throw new ApiError('passwords do not match', 400);
    return await this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUserDto): Promise<[number, User[]]> {
    return await this.usersService.update(id, updateUsuarioDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/password')
  async updatePassword(@Param('id') id: string, @Body() updateUserPassword: UpdateUserPasswordDto): Promise<[number, User[]]> {
    return await this.usersService.updatePassword(id, updateUserPassword);
  }

  @Post('code-checked/:email')
  async sendEmailcheck(@Param('email') email: string): Promise<boolean> {
    return await this.usersService.sendEmailcheck(email);
  }

  @Get('code-checked/:email/:code')
  async getCheckEmail(@Param('email') email: string, @Param('code') code: string): Promise<boolean> {
    return await this.usersService.getCheckEmail(code, email);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return await this.usersService.remove(id);
  }

  @Post('email-reset-password')
  async sendEmailPassword(@Body() emailDto: EmailResetDto): Promise<boolean> {
    return await this.usersService.sendEmailWithHashResetPassword(emailDto.email);
  }

  @Put('reset-password')
  async redefinePassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ usuarioId: number }> {
    const { token, email, password, repassword } = resetPasswordDto;
    const redefinido = await this.usersService.redefinirSenha(token, email, password, repassword);
    return { usuarioId: redefinido };
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('paginate')
  async getPaginate(@Query('limit') limit: string = '10', @Query('offset') offset: string = '0'): Promise<{ rows: User[]; count: number }> {
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);
    if (isNaN(limitNumber) || isNaN(offsetNumber)) throw new ApiError('Invalid query parameters, not numbers.', 400);
    return await this.usersService.listarPaginado(limitNumber, offsetNumber);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('typeof')
  async getAllUsers(@Query('tipouser') tipouser: string): Promise<User[]> {
    return await this.usersService.getUsersOfType(tipouser);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/photo')
  @ApiConsumes('multipart/form-data')
  async uploadPhoto(@Param('id') id: string, @Req() req: FastifyRequest) {
    const file = await req.file(); // Fastify retorna aqui o arquivo

    if (!file) throw new ApiError('No photo sent', 400);

    const buffer = await file.toBuffer();
    const ext = extname(file.filename);
    const newName = `photo-${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

    const uploadDir = join(process.cwd(), 'uploads/users/profile');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadPath = join(uploadDir, newName);
    await fs.writeFile(uploadPath, buffer);

    const filePath = `/uploads/users/profile/${newName}`;

    return await this.usersService.addPhoto(id, filePath);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/addresses')
  async getUserAddresses(@Param('id') id: string) {
    return await this.usersService.findByIdWithAddress(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':userId/addresses/:addressId')
  async addAddressToUser(@Param('userId') userId: string, @Param('addressId') addressId: string) {
    return await this.usersService.addAddress(userId, addressId);
  }

}
