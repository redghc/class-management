import { GroupDegree, GroupSubject } from '@/interfaces/group';

interface IGroupDegree {
  name: string;
  value: GroupDegree;
}

interface IGroupSubject {
  name: string;
  value: GroupSubject;
}

export const groupDegreeList: IGroupDegree[] = [
  {
    name: 'Primero',
    value: GroupDegree.FIRST,
  },
  {
    name: 'Segundo',
    value: GroupDegree.SECOND,
  },
  {
    name: 'Tercero',
    value: GroupDegree.THIRD,
  },
  {
    name: 'Cuarto',
    value: GroupDegree.FOURTH,
  },
  {
    name: 'Quinto',
    value: GroupDegree.FIFTH,
  },
  {
    name: 'Sexto',
    value: GroupDegree.SIXTH,
  },
];

export const groupSubjectList: IGroupSubject[] = [
  {
    name: 'Matemáticas',
    value: GroupSubject.MATH,
  },
  {
    name: 'Español',
    value: GroupSubject.SPANISH,
  },
  {
    name: 'Química',
    value: GroupSubject.CHEMISTRY,
  },
  {
    name: 'Física',
    value: GroupSubject.PHYSICS,
  },
  {
    name: 'Biología',
    value: GroupSubject.BIOLOGY,
  },
  {
    name: 'Historia',
    value: GroupSubject.HISTORY,
  },
  {
    name: 'Geografía',
    value: GroupSubject.GEOGRAPHY,
  },
  {
    name: 'Inglés',
    value: GroupSubject.ENGLISH,
  },
];
