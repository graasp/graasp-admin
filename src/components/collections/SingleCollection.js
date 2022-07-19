import React from 'react';
import { useRouteMatch } from 'react-router';
import { mockSingleCollection } from '../../config/constants';
import { buildCollectionPath } from '../../config/paths';

import ItemsTable from '../items/ItemsTable';

const SingleCollection = () => {
  const match = useRouteMatch(buildCollectionPath());

  const collectionId = match?.params?.collectionId;
  console.log(collectionId);
  // const { data: collection, isLoading } = useCollection(collectionId);
  const collection = mockSingleCollection;

  const items = [
    {
      id: 'a1ad77e7-5c88-4050-a5cc-21ef129dc5cb',
      name: 'Introduction',
      description:
        '<h3><span style="color: rgb(0, 71, 178);">Bienvenue !</span></h3><p><span style="color: rgb(0, 71, 178);">&nbsp;</span></p><p><span style="color: rgb(0, 71, 178);">Ceci est un&nbsp;</span><strong style="color: rgb(0, 71, 178);"><em>dispositif d’enseignement mi-fini</em></strong><span style="color: rgb(0, 71, 178);">&nbsp;: à vous de le reprendre et de le travailler comme vous le souhaitez avec vos élèves !</span></p><p><span style="color: rgb(0, 71, 178);">&nbsp;</span></p><p><span style="color: rgb(0, 71, 178);">Notre objectif est de vous fournir des outils, ressources et propositions pour travailler la&nbsp;</span><strong style="color: rgb(0, 71, 178);"><em>modélisation</em></strong><span style="color: rgb(0, 71, 178);">&nbsp;avec vos élèves en physique (ou en sciences de la nature).</span></p><p><span style="color: rgb(0, 71, 178);">&nbsp;</span></p><p><span style="color: rgb(0, 71, 178);">Il n’y a pas de livre du maître ni de livre de l’élève, mais un ensemble de choses dont les usages sont tantôt définis, tantôt laissés à votre choix.</span></p><p><br></p><p><span style="color: rgb(0, 71, 178);">Vous trouverez ici les finalités du dispositif d\'enseignement mi-fini, les références théoriques, observations et réflexions à l\'origine de sa conception.</span></p>',
      type: 'folder',
      path:
        '0e9c88a2_abfd_488a_98c9_ee140e080444.a1ad77e7_5c88_4050_a5cc_21ef129dc5cb',
      extra: {
        folder: {
          childrenOrder: [
            'eeaad4e7-2c88-45e9-9d72-c0ba5058a328',
            '9f1b4b91-97c5-4623-97dd-339335bead23',
            '0591a863-2cb7-4170-94a3-c62491addd50',
          ],
        },
      },
      creator: '42fc200f-0ed7-4e02-9f78-65f5452b618c',
      createdAt: '2022-06-03T07:59:18.311Z',
      updatedAt: '2022-06-03T08:02:10.852Z',
      settings: {
        hasThumbnail: true,
      },
    },
    {
      id: 'bdfbae1f-1d96-439f-a69d-6aeb216bdd4c',
      name: 'Séquences',
      description:
        '<p><span style="color: rgb(0, 71, 178);">Vous trouverez ici des séquences organisées, dont les enchaînements ont été pensés en fonction de la progression des élèves dans leurs apprentissages (prérequis, etc.).</span></p>',
      type: 'folder',
      path:
        '0e9c88a2_abfd_488a_98c9_ee140e080444.bdfbae1f_1d96_439f_a69d_6aeb216bdd4c',
      extra: {
        folder: {
          childrenOrder: [
            'e4668bb9-5ddc-4e06-88ef-1f649bee971a',
            '3275a489-053a-4c89-a17f-3eea670f6d1c',
            '1018bcf9-4c56-4b19-8b5e-5564828ea3eb',
          ],
        },
      },
      creator: '42fc200f-0ed7-4e02-9f78-65f5452b618c',
      createdAt: '2022-06-03T07:59:18.311Z',
      updatedAt: '2022-06-03T09:23:02.989Z',
      settings: {
        hasThumbnail: true,
      },
    },
  ];
  return (
    <>
      <ItemsTable
        id={collectionId}
        items={items}
        tableTitle={collection.name}
      />
    </>
  );
};

export default SingleCollection;
