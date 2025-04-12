type FetchOptions = RequestInit & {
    token?: string;
    skipAuth?: boolean;
  };
  
  // Fonction pour effectuer des requêtes API avec authentification
  export async function fetchApi(
    url: string,
    options: FetchOptions = {}
  ) {
    // Destructurer les options
    const { token: optionsToken, skipAuth, ...fetchOptions } = options;
    
    // Déterminer le token à utiliser
    let token: string | undefined = optionsToken;
    
    // Si aucun token n'est fourni dans les options et que l'authentification n'est pas ignorée,
    // récupérer le token depuis le stockage local
    if (!token && !skipAuth) {
        const storedToken = localStorage.getItem('token');
        // Convertir null en undefined pour correspondre au type attendu
        token = storedToken !== null ? storedToken : undefined;
    }
    
    // Préparer les headers
    const headers = new Headers(fetchOptions.headers);
    
    // Ajouter le header Content-Type si non spécifié
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    
    // Ajouter le token aux headers si disponible
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    // Effectuer la requête
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });
    
    // // Si la réponse indique que le token est expiré ou invalide (401)
    // if (response.status === 401 && !skipAuth) {
    //   // Si nous sommes dans un environnement client, supprimer le token du stockage local
    //   if (typeof window !== 'undefined') {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
        
    //     // Rediriger vers la page de connexion
    //     window.location.href = '/';
    //   }
    // }
    
    // Analyser la réponse
    const data = await response.json().catch(() => ({}));
    
    // Si la réponse n'est pas OK, lever une erreur
    if (!response.ok) {
      throw new Error(data.message || 'Erreur de requête API');
    }
    
    return data;
  }
  