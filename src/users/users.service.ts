import { Injectable } from '@nestjs/common';
import e from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'fH2Ct@example.com',
            role: 'ADMIN'
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'fH2Ct@example.com',
            role: 'ENGINEER'
        },
        {
            id: 3,
            name: 'Lina Doe',
            email: 'fH2Ct@example.com',
            role: 'INTERN'
        }
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray =  this.users.filter(user => user.role === role);
            if (rolesArray.length === 0) throw new NotFoundException(`User Role Not Found`); else {
                return rolesArray;
            }
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHigherId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = { id: usersByHigherId[0].id + 1, ...createUserDto };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto };
            }
            return user;
        })

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}