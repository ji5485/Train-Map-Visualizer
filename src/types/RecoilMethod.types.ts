import { SetterOrUpdater } from 'recoil'

export type Getter<Type> = Type

export type Setter<Type> = SetterOrUpdater<Type>

export type GetterAndSetter<Type> = [Getter<Type>, Setter<Type>]
