import type { User } from './User.model'

export interface UserService {
    login: (userCred: User) => Promise<User>
    logout: () => Promise<any>
    signup: (userCred: User) => Promise<User>
    getLoggedinUser: () => User
    getUsers: () => Promise<User[]>
    getById: (userId: string) => Promise<User>
    remove: (userId: string) => Promise<void>
    update: (user: User) => void
    saveLocalUser: (user: User) => void
}