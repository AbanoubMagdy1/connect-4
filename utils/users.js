let forPairs = [];
let forFriends = [];

function addToPairing(id) {
  forPairs.push(id);
}

function addToFriends(id) {
  forFriends.push(id);
}

function removeFromFriends(id) {
  forFriends = forFriends.filter(f => f !== id);
}

function removeFromPairing(id) {
  forPairs = forPairs.filter(f => f !== id);
}

function pair() {
  return forPairs.pop();
}

function pairWithFriend(friendId) {
  const friend = forFriends.find(f => f === friendId);
  if (friend) {
    forFriends = forFriends.filter(f => f !== friend);
    return friend;
  } else {
    return null;
  }
}

function disconnect(id) {
  forPairs = forPairs.filter(f => f !== id);
  forFriends = forFriends.filter(f => f !== id);
}

export {
  pair,
  pairWithFriend,
  addToFriends,
  addToPairing,
  removeFromFriends,
  removeFromPairing,
  disconnect,
};
