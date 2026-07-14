// ARISEv2 shared auth guard.
// Every page except index.html includes this (after firebase-config.js).
// It's the single place that decides "is someone allowed to be on this
// page, and as what role" — so we're not duplicating that check in every
// feature file as we split the game apart.
//
// Usage:
//   initAuthGuard({
//     onHunter: (userData, uid) => { ...show the hunter version of this page... },
//     onRuler:  (userData, uid) => { ...show the ruler version of this page... }
//   });
//
// If a page only needs one role (e.g. a hunter-only page like inventory.html),
// just omit the other callback — anyone with the wrong role gets sent back
// to dashboard.html instead of being left stuck on a page with nothing to show.
function initAuthGuard({ onHunter, onRuler } = {}) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    db.collection('users').doc(user.uid).get().then((doc) => {
      const data = doc.data();
      if (!data) {
        // Auth account exists but has no Firestore profile — not a valid
        // dashboard user, send them back to sign in/up properly.
        auth.signOut();
        window.location.href = 'index.html';
        return;
      }
      if (data.role === 'hunter') {
        if (onHunter) {
          onHunter(data, user.uid);
        } else {
          window.location.href = 'dashboard.html';
        }
      } else if (data.role === 'admin') {
        if (onRuler) {
          onRuler(data, user.uid);
        } else {
          window.location.href = 'dashboard.html';
        }
      } else {
        auth.signOut();
        window.location.href = 'index.html';
      }
    }).catch((err) => console.error('Auth guard error:', err));
  });
}

// Shared logout used by every page's nav — signs out then sends the
// person back to the login screen.
function logoutAndRedirect() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  }).catch((err) => console.error('Logout error:', err));
}
