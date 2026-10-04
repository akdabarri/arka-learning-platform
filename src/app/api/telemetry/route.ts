// src/app/api/telemetry/route.ts
import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('arka_telemetry').insert([body]);
      if (error) {
        console.warn('Supabase telemetry warning:', error.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Telemetri berhasil dicatat' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Gagal memproses telemetri' },
      { status: 500 }
    );
  }
}