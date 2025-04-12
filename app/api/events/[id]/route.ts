import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Récupérer un événement par ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    
    const event = await prisma.academicEvent.findUnique({
      where: { id }
    });
    
    if (!event) {
      return NextResponse.json(
        { message: 'Événement non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Mettre à jour un événement
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    
    // Récupérer l'utilisateur connecté depuis le middleware
    const requestHeaders = new Headers(request.headers);
    const userJson = requestHeaders.get('user');
    
    if (!userJson) {
      return NextResponse.json(
        { message: 'Utilisateur non identifié' },
        { status: 401 }
      );
    }
    
    const user = JSON.parse(userJson);
    
    // Vérifier que l'utilisateur est un administrateur
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Action non autorisée' },
        { status: 403 }
      );
    }
    
    const updateData = await request.json();
    
    // Mettre à jour l'événement
    const updatedEvent = await prisma.academicEvent.update({
      where: { id },
      data: {
        ...updateData,
        startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
        endDate: updateData.endDate ? new Date(updateData.endDate) : undefined
      }
    });
    
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

 new Headers(request.headers);
    const userJson = requestHeaders.get('user');
    
    if (!userJson) {
      return NextResponse.json(
        { message: 'Utilisateur non identifié' },
        { status: 401 }
      );
    }
    
    const user = JSON.parse(userJson);
    
    // Vérifier que l'utilisateur est un administrateur
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Action non autorisée' },
        { status: 403 }
      );
    }
    
    // Supprimer l'événement
    await prisma.academicEvent.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Error deleting event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}