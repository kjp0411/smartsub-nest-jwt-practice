import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
};

@Injectable()
export class UsersService {
    // 실제 DB 대신 임시 메모리 배열로 시작
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'kjp0411',
            password: '$2b$10$oIXGDsTG2AKpamTKlw5lYeE3XC5GCqkAJrkWr0I0YOXznOIb03zz6',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
    }
}
