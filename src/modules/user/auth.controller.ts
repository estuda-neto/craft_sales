import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RefreshDto } from './dto';
import { ApiError } from 'src/common/errors/apierror.class';
import { LoginResponse } from './dto/loginresponse.dto.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginUsuarioDto: LoginUserDto): Promise<LoginResponse> {
        const { email, password, clientType } = loginUsuarioDto;
        if (!['web', 'mobile'].includes(clientType)) throw new ApiError('client type invalid', 400);
        return await this.authService.login(email, password, clientType);
    }

    @Post('refresh')
    async refresh(@Body() body: RefreshDto) {
        const { refreshToken, clientType } = body;
        if (!refreshToken) throw new ApiError('refresh token is required', 400);
        if (!['web', 'mobile'].includes(clientType)) throw new ApiError('client type invalid', 400);

        return await this.authService.gernerateOtherTokenWithRefreshToken(refreshToken, clientType);
    }
}
