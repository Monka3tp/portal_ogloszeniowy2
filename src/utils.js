export function formatFirebaseError(errorMessage) {
  const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];

  if (!errorCode) return "Wystąpił nieznany błąd. Spróbuj ponownie.";

  const errorMessages = {
    'auth/email-already-in-use': 'Ten adres e-mail jest już używany przez inne konto.',
    'auth/invalid-email': 'Podany adres e-mail jest nieprawidłowy.',
    'auth/weak-password': 'Hasło jest zbyt słabe. Użyj minimum 6 znaków.',
    'auth/user-not-found': 'Nie znaleziono użytkownika z tym adresem e-mail.',
    'auth/wrong-password': 'Nieprawidłowe hasło. Spróbuj ponownie.',
    'auth/too-many-requests': 'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później.',
    'auth/operation-not-allowed': 'Ta metoda logowania nie jest dozwolona.',
    'auth/popup-closed-by-user': 'Okno logowania zostało zamknięte przed dokończeniem procesu.',
    'auth/network-request-failed': 'Wystąpił problem z połączeniem sieciowym. Sprawdź swoje połączenie z internetem.'
  };

  return errorMessages[errorCode] || `Wystąpił błąd: ${errorMessage}`;
}