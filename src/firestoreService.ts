import { firebase } from "./firebaseInit";

const firestore = firebase.firestore();

const createDocument = (
  collection: string,
  document: firebase.firestore.DocumentData
) => {
  return firestore.collection(collection).add(document);
};

const readDocument = (collection: string, id: string) => {
  return firestore.collection(collection).doc(id).get();
};

const readDocuments = async ({
  collection,
  queries,
  orderByField,
  orderByDirection,
  perPage,
  cursorId,
}: {
  collection: string;
  queries: {
    field: string;
    condition: firebase.firestore.WhereFilterOp;
    value: string;
  }[];
  orderByField: string;
  orderByDirection: firebase.firestore.OrderByDirection;
  perPage: number;
  cursorId: string;
}) => {
  let collectionRef = firestore.collection(collection);

  if (queries && queries.length > 0) {
    for (const query of queries) {
      collectionRef.where(query.field, query.condition, query.value);
    }
  }

  if (orderByField && orderByDirection) {
    collectionRef.orderBy(orderByField, orderByDirection);
  }

  if (perPage) {
    collectionRef.limit(perPage);
  }

  if (cursorId) {
    const document = await readDocument(collection, cursorId);

    collectionRef.startAfter(document);
  }

  return collectionRef.get();
};

const updateDocument = (
  collection: string,
  id: string,
  document: firebase.firestore.DocumentData
) => {
  return firestore.collection(collection).doc(id).update(document);
};

const deleteDocument = (collection: string, id: string) => {
  return firestore.collection(collection).doc(id).delete();
};

export {
  createDocument,
  readDocument,
  updateDocument,
  deleteDocument,
  readDocuments,
};
