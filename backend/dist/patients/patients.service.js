"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PatientsService = class PatientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(search) {
        return this.prisma.patient.findMany({
            where: search
                ? {
                    name: {
                        contains: search,
                    },
                }
                : undefined,
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const patient = await this.prisma.patient.findUnique({
            where: { id },
            include: {
                events: { orderBy: [{ date: 'asc' }, { startTime: 'asc' }] },
                evolutions: { orderBy: [{ date: 'desc' }, { startTime: 'desc' }] },
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Paciente nao encontrado.');
        }
        return patient;
    }
    create(dto) {
        return this.prisma.patient.create({
            data: {
                ...dto,
                birthDate: new Date(dto.birthDate),
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.patient.update({
            where: { id },
            data: {
                ...dto,
                birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.patient.delete({ where: { id } });
        return { message: 'Paciente removido com sucesso.' };
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map