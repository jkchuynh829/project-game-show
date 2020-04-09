import { firestore } from "./index";

export const questionsWithIds = doc => ({
  id: doc.id,
  ...doc.data()
});

export const getQuestions = () => {
  return firestore
    .collection("questions")
    .orderBy("createdAt")
    .get();
};

export const deleteQuestion = id => {
  return firestore
    .collection("questions")
    .doc(id)
    .delete();
};

export const postQuestion = body => {
  return firestore.collection("questions").add(body);
};

export const getLeaderboard = () => {
  return firestore
    .collection("leaderboard")
    .orderBy("score", "desc")
    .get();
};

export const postScore = body => {
  return firestore.collection("leaderboard").add(body);
};
