import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const musicDir = path.join(process.cwd(), 'public', 'music');
        
        // Check if music directory exists
        if (!fs.existsSync(musicDir)) {
            return NextResponse.json([]);
        }

        const files = fs.readdirSync(musicDir);
        
        // Filter for audio files
        const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
        const musicFiles = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return audioExtensions.includes(ext);
            })
            .map(file => `/music/${file}`)
            .sort(); // Sort alphabetically

        return NextResponse.json(musicFiles);
    } catch (error) {
        console.error('Error reading music directory:', error);
        return NextResponse.json([]);
    }
}