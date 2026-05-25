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
exports.EvolutionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EvolutionsService = class EvolutionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByPatient(patientId) {
        await this.ensurePatientExists(patientId);
        return this.prisma.evolution.findMany({
            where: { patientId },
            orderBy: [{ date: 'desc' }, { startTime: 'desc' }],
        });
    }
    async create(patientId, dto) {
        await this.ensurePatientExists(patientId);
        return this.prisma.evolution.create({
            data: {
                ...dto,
                date: new Date(dto.date),
                patientId,
            },
        });
    }
    async ensurePatientExists(patientId) {
        const patient = await this.prisma.patient.findUnique({ where: { id: patientId } });
        if (!patient) {
            throw new common_1.NotFoundException('Paciente nao encontrado.');
        }
    }
};
exports.EvolutionsService = EvolutionsService;
exports.EvolutionsService = EvolutionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EvolutionsService);
//# sourceMappingURL=evolutions.service.js.map