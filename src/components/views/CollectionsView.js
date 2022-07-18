import React from 'react';
// import { Loader } from '@graasp/ui';
// import Members from '../members/Members';
// import { hooks } from '../../config/queryClient';
import Collections from '../collections/Collections';

// const { useAllMembers } = hooks;

const CollectionsView = () => {
  // const { data: allMembers, isLoading } = useAllMembers();

  // if (isLoading) {
  //   return <Loader />;
  // }

  const collections = [
    {
      id: '0e9c88a2-abfd-488a-98c9-ee140e080444',
      name: "Modélisation en physique: un dispositif d'enseignement mi-fini",
      description:
        '<h4><span style="color: rgb(0, 71, 178);">Ce dispositif s\'adresse aux enseignant·e·s</span></h4><p><br></p><p><span style="color: rgb(0, 71, 178);">Cet environnement Graasp est structuré pour fonctionner comme un dispositif d\'enseignement à mettre en oeuvre dans sa ou ses classes, à adapter à ses usages et à ses objectifs, à développer puis partager avec d\'autres enseignant·e·s.</span></p><p><br></p><h4><span style="color: rgb(0, 71, 178);">Ce dispositif est mi-fini (</span><em style="color: rgb(0, 71, 178);">half-baked</em><span style="color: rgb(0, 71, 178);">)</span></h4><p><br></p><p><span style="color: rgb(0, 71, 178);">La structure prédéfinie de ce </span><em style="color: rgb(0, 71, 178);">template</em><span style="color: rgb(0, 71, 178);"> peut être enrichie de modifications et d\'ajouts par ses utilisateurs, qui participent ainsi à sa conception. Les copies et variantes du dispositif, initialement </span><em style="color: rgb(0, 71, 178);">mi-fini</em><span style="color: rgb(0, 71, 178);">, permettent son adaptation à de multiples contextes et la mémoire des divers usages, de manière à colporter l\'expérience grâce aux traces laissées par chacun·e, et partager les usages du dispositif.</span></p>',
      type: 'folder',
      path: '0e9c88a2-abfd-488a-98c9-ee140e080444',
      creator: '42fc200f-0ed7-4e02-9f78-65f5452b618c',
      updatedAt: '2022-06-03T08:00:13.918Z',
      createdAt: '2022-06-03T07:59:18.311Z',
      settings: { hasThumbnail: true, ccLicenseAdaption: 'alike' },
      extra: {
        folder: {
          childrenOrder: [
            'a1ad77e7-5c88-4050-a5cc-21ef129dc5cb',
            'bdfbae1f-1d96-439f-a69d-6aeb216bdd4c',
            '00b608fd-dfdd-4959-b703-941c7842568b',
            '4a5fdaa7-c204-4741-929f-e8f75fda05f3',
            'f7b3ea31-bf26-47c1-b868-44ebd81c4090',
            'a2ba1213-367a-4e3a-98b8-e858a99d1afc',
            'b6cf91a9-4df7-4cec-8a8c-043b62d44266',
          ],
        },
      },
    },
    {
      id: '11908be7-a968-4185-aba3-8c8bc0488bbd',
      name: 'Data Literacy',
      description: '<p>Data Literacy:</p><p>Ethical Literacy</p>',
      type: 'folder',
      path: '11908be7_a968_4185_aba3_8c8bc0488bbd',
      extra: {},
      creator: '81c0983d-db6c-4319-afa6-bcc9bace16f6',
      createdAt: '2022-06-21T13:30:44.542Z',
      updatedAt: '2022-06-21T13:57:47.026Z',
      settings: {
        tags: ['literacy', 'digitalskills', 'dataliteracy'],
        hasThumbnail: false,
        ccLicenseAdaption: 'allow',
      },
    },
  ];

  return <Collections title="All Collections" collections={collections} />;
};

export default CollectionsView;
