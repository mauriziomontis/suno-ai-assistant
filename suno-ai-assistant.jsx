import React, { useState } from 'react';
import { Wand2, Settings, FileText, Sparkles, Music, Mic, Volume2, Clock, Sliders, RefreshCw, Copy, Check, AlertCircle, Search } from 'lucide-react';

const SunoAIAssistant = () => {
  const [activeTab, setActiveTab] = useState('generator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Generator state
  const [idea, setIdea] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('industrial-metal');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  
  // Language options
  const languages = [
    { id: 'english', name: 'English', flag: '🇬🇧' },
    { id: 'italian', name: 'Italiano', flag: '🇮🇹' },
    { id: 'spanish', name: 'Español', flag: '🇪🇸' },
    { id: 'french', name: 'Français', flag: '🇫🇷' },
    { id: 'german', name: 'Deutsch', flag: '🇩🇪' },
    { id: 'portuguese', name: 'Português', flag: '🇵🇹' },
    { id: 'japanese', name: '日本語', flag: '🇯🇵' },
    { id: 'korean', name: '한국어', flag: '🇰🇷' },
    { id: 'chinese', name: '中文', flag: '🇨🇳' },
    { id: 'russian', name: 'Русский', flag: '🇷🇺' },
    { id: 'arabic', name: 'العربية', flag: '🇸🇦' },
    { id: 'hindi', name: 'हिन्दी', flag: '🇮🇳' },
    { id: 'dutch', name: 'Nederlands', flag: '🇳🇱' },
    { id: 'swedish', name: 'Svenska', flag: '🇸🇪' },
    { id: 'finnish', name: 'Suomi', flag: '🇫🇮' },
    { id: 'polish', name: 'Polski', flag: '🇵🇱' },
    { id: 'turkish', name: 'Türkçe', flag: '🇹🇷' },
    { id: 'greek', name: 'Ελληνικά', flag: '🇬🇷' }
  ];
  
  // Generated content
  const [stylePrompt, setStylePrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [structure, setStructure] = useState([]);
  
  // Detailed controls
  const [vocalists, setVocalists] = useState([
    { id: 1, gender: 'male', range: 'baritone', style: 'harsh', active: true }
  ]);
  const [instruments, setInstruments] = useState([]);
  const [mood, setMood] = useState('dark');
  const [energy, setEnergy] = useState('high');
  const [bpm, setBpm] = useState(120);
  const [songStructure, setSongStructure] = useState('standard');
  const [tagLibraryCategory, setTagLibraryCategory] = useState('genres');
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  // Tag Library - comprehensive collection of usable tags
  const tagLibrary = {
    genres: {
      name: 'Genres & Subgenres',
      tags: [
        'industrial metal', 'gothic metal', 'doom metal', 'progressive metal', 'symphonic metal',
        'death metal', 'black metal', 'thrash metal', 'power metal', 'metalcore',
        'alternative rock', 'indie rock', 'hard rock', 'punk rock', 'grunge',
        'pop', 'synth pop', 'indie pop', 'electropop', 'dream pop', 'art pop',
        'R&B', 'neo-soul', 'soul', 'funk', 'disco', 'motown',
        'hip-hop', 'trap', 'boom bap', 'conscious rap', 'lo-fi hip-hop',
        'EDM', 'house', 'techno', 'trance', 'dubstep', 'drum and bass',
        'darkwave', 'synthwave', 'ambient', 'trip hop', 'IDM',
        'jazz', 'smooth jazz', 'bebop', 'blues', 'blues rock',
        'classical', 'baroque', 'romantic classical', 'film score',
        'country', 'bluegrass', 'folk', 'indie folk', 'americana',
        'reggae', 'reggaeton', 'salsa', 'bossa nova', 'afrobeat', 'flamenco'
      ]
    },
    instruments: {
      name: 'Instruments',
      tags: [
        'distorted guitars', 'electric guitar', 'acoustic guitar', 'bass guitar',
        'heavy drums', 'electronic drums', 'drum machine', 'live drums',
        'synthesizers', 'analog synths', 'digital synths', 'synth pads',
        'piano', 'electric piano', 'organ', 'harpsichord',
        'strings', 'violin', 'cello', 'orchestral strings',
        'brass section', 'trumpet', 'saxophone', 'trombone',
        'choir', 'gospel choir', 'background vocals',
        '808s', 'sub bass', 'synth bass',
        'arpeggiator', 'sequencer',
        'banjo', 'mandolin', 'fiddle', 'pedal steel',
        'sitar', 'oud', 'darbuka', 'tabla',
        'Hammond organ', 'mellotron', 'theremin'
      ]
    },
    vocalStyles: {
      name: 'Vocal Styles',
      tags: [
        'harsh vocals', 'clean vocals', 'growling', 'screaming', 'shouted vocals',
        'whispered vocals', 'ethereal vocals', 'operatic vocals', 'theatrical vocals',
        'smooth vocals', 'powerful vocals', 'soulful vocals', 'raspy vocals',
        'melodic vocals', 'rap vocals', 'spoken word', 'narration',
        'falsetto', 'baritone', 'soprano', 'alto', 'tenor',
        'crooner', 'belting', 'melismatic', 'vibrato',
        'auto-tuned vocals', 'vocoded vocals', 'robotic vocals', 'processed vocals',
        'gospel vocals', 'bluesy vocals', 'jazzy vocals', 'scat singing',
        'twangy vocals', 'yodeling', 'gregorian chant'
      ]
    },
    moods: {
      name: 'Moods & Atmospheres',
      tags: [
        'dark', 'atmospheric', 'intense', 'aggressive', 'melancholic',
        'epic', 'cinematic', 'dramatic', 'haunting', 'mysterious',
        'uplifting', 'joyful', 'euphoric', 'energetic', 'cheerful',
        'romantic', 'sensual', 'intimate', 'passionate', 'tender',
        'chill', 'relaxed', 'mellow', 'smooth', 'peaceful',
        'gritty', 'raw', 'edgy', 'rebellious', 'visceral',
        'ethereal', 'dreamy', 'hypnotic', 'mystical', 'otherworldly',
        'ominous', 'sinister', 'foreboding', 'menacing', 'brooding',
        'nostalgic', 'bittersweet', 'wistful', 'contemplative', 'introspective'
      ]
    },
    production: {
      name: 'Production & Sound',
      tags: [
        'heavy distortion', 'clean production', 'lo-fi', 'hi-fi',
        'reverb-heavy', 'dry mix', 'compressed', 'dynamic',
        'analog warmth', 'digital clarity', 'vintage sound', 'modern production',
        'layered production', 'minimal', 'dense mix', 'spacious',
        'punchy drums', 'booming bass', 'crisp hi-hats', 'rolling bass',
        'tape saturation', 'vinyl crackle', 'vinyl hiss',
        'glitchy', 'granular', 'chopped and screwed',
        'stadium sound', 'bedroom production', 'garage sound'
      ]
    },
    tempo: {
      name: 'Tempo Descriptors',
      tags: [
        'slow tempo', 'mid-tempo', 'fast tempo', 'very fast',
        'Grave', 'Adagio', 'Andante', 'Moderato', 'Allegro', 'Presto',
        'downtempo', 'uptempo', 'breakneck speed',
        '60 BPM', '80 BPM', '100 BPM', '120 BPM', '140 BPM', '160 BPM', '180 BPM'
      ]
    },
    rhythmic: {
      name: 'Rhythmic Elements',
      tags: [
        'syncopated', 'four-on-the-floor', 'breakbeat', 'shuffled',
        'half-time', 'double-time', 'polyrhythmic', 'swing',
        'straight rhythm', 'triplet feel', 'dotted rhythms',
        'blast beats', 'double bass drums', 'march rhythm',
        'reggae rhythm', 'samba rhythm', 'bossa rhythm', 'dembow rhythm',
        'trap hi-hats', 'rolling hi-hats', 'skittering percussion'
      ]
    },
    effects: {
      name: 'Effects & Processing',
      tags: [
        'reverb', 'delay', 'echo', 'chorus', 'flanger', 'phaser',
        'distortion', 'overdrive', 'fuzz', 'bitcrusher',
        'sidechain compression', 'ducking', 'pumping bass',
        'pitch shift', 'time stretch', 'granular',
        'tremolo', 'vibrato', 'leslie speaker',
        'vocoder', 'talkbox', 'autotune'
      ]
    },
    energy: {
      name: 'Energy Levels',
      tags: [
        'high energy', 'medium energy', 'low energy',
        'explosive', 'powerful', 'intense', 'fierce',
        'calm', 'subdued', 'gentle', 'soft',
        'building energy', 'dropping energy', 'dynamic shifts',
        'crescendo', 'decrescendo', 'climactic', 'anthemic'
      ]
    },
    texture: {
      name: 'Textures & Qualities',
      tags: [
        'smooth', 'rough', 'gritty', 'polished', 'raw',
        'warm', 'cold', 'bright', 'dark', 'muddy',
        'crystalline', 'fuzzy', 'clean', 'dirty', 'pristine',
        'organic', 'synthetic', 'mechanical', 'human',
        'dense', 'sparse', 'thick', 'thin', 'layered'
      ]
    },
    cultural: {
      name: 'Cultural & Regional',
      tags: [
        '80s', '90s', '70s retro', '60s classic', 'modern',
        'Neue Deutsche Härte', 'Nordic', 'Mediterranean', 'Latin',
        'British', 'American', 'European', 'Asian influence',
        'African rhythms', 'Middle Eastern scales', 'Oriental',
        'Western', 'tribal', 'folk traditions', 'world music'
      ]
    },
    structural: {
      name: 'Structural Elements',
      tags: [
        'melodic', 'harmonic', 'rhythmic focus',
        'riff-based', 'groove-based', 'beat-driven',
        'call and response', 'verse-chorus', 'through-composed',
        'improvisation', 'structured', 'freeform',
        'progressive', 'repetitive', 'minimalist', 'maximalist',
        'build-ups', 'drops', 'breakdowns', 'bridges'
      ]
    }
  };

  const genres = [
    // Metal & Heavy
    { id: 'industrial-metal', name: 'Industrial Metal', tags: 'distorted guitars, electronic drums, harsh vocals, mechanical' },
    { id: 'gothic-metal', name: 'Gothic Metal', tags: 'symphonic, operatic vocals, orchestral, dark romantic' },
    { id: 'doom-metal', name: 'Doom Metal', tags: 'slow heavy riffs, mournful, crushing, Grave tempo' },
    { id: 'ndh', name: 'Neue Deutsche Härte', tags: 'industrial metal, hard rock, techno, gothic keyboard' },
    { id: 'progressive-metal', name: 'Progressive Metal', tags: 'complex rhythms, technical, odd time signatures' },
    { id: 'symphonic-metal', name: 'Symphonic Metal', tags: 'orchestral, choir, epic, grandiose' },
    { id: 'thrash-metal', name: 'Thrash Metal', tags: 'fast tempo, aggressive, palm-muted riffs, intense' },
    { id: 'death-metal', name: 'Death Metal', tags: 'growling vocals, blast beats, heavy distortion, brutal' },
    { id: 'black-metal', name: 'Black Metal', tags: 'tremolo picking, blast beats, shrieking vocals, atmospheric' },
    { id: 'power-metal', name: 'Power Metal', tags: 'fast tempo, clean vocals, epic, fantasy themes' },
    
    // Rock
    { id: 'alternative-rock', name: 'Alternative Rock', tags: 'guitar-driven, emotional, dynamic, raw' },
    { id: 'indie-rock', name: 'Indie Rock', tags: 'guitar, lo-fi aesthetic, introspective, authentic' },
    { id: 'grunge', name: 'Grunge', tags: 'distorted guitars, angst, raw vocals, 90s Seattle' },
    { id: 'punk-rock', name: 'Punk Rock', tags: 'fast tempo, power chords, rebellious, energetic' },
    { id: 'hard-rock', name: 'Hard Rock', tags: 'heavy guitar riffs, powerful drums, strong vocals' },
    { id: 'classic-rock', name: 'Classic Rock', tags: 'guitar solos, bluesy, anthemic, 70s influence' },
    { id: 'psychedelic-rock', name: 'Psychedelic Rock', tags: 'experimental, reverb, trippy, effects-heavy' },
    
    // Pop
    { id: 'pop', name: 'Pop', tags: 'catchy hooks, melodic, radio-friendly, upbeat' },
    { id: 'synth-pop', name: 'Synth Pop', tags: 'synthesizers, electronic beats, catchy melodies, 80s' },
    { id: 'indie-pop', name: 'Indie Pop', tags: 'melodic, jangly guitars, upbeat, quirky' },
    { id: 'dream-pop', name: 'Dream Pop', tags: 'ethereal, reverb-heavy, atmospheric, shoegaze influence' },
    { id: 'electropop', name: 'Electropop', tags: 'electronic production, synths, dance-oriented, modern' },
    { id: 'art-pop', name: 'Art Pop', tags: 'experimental, theatrical, unconventional, artistic' },
    { id: 'sadcore', name: 'Sadcore', tags: 'melancholic, cinematic, emotional, slow tempo' },
    
    // R&B & Soul
    { id: 'rnb', name: 'R&B', tags: 'smooth vocals, groove, emotional, soulful production' },
    { id: 'neo-soul', name: 'Neo-Soul', tags: 'jazz influence, organic, smooth, conscious lyrics' },
    { id: 'soul', name: 'Soul', tags: 'emotional vocals, gospel influence, passionate, heartfelt' },
    { id: 'funk', name: 'Funk', tags: 'groovy bass, syncopated rhythms, brass section, danceable' },
    { id: 'disco', name: 'Disco', tags: 'four-on-the-floor beat, strings, groovy, danceable, 70s' },
    { id: 'motown', name: 'Motown', tags: 'soulful vocals, tambourine, bass-heavy, 60s classic' },
    
    // Hip-Hop & Rap
    { id: 'hip-hop', name: 'Hip-Hop', tags: 'rap vocals, beats, sampling, rhythmic flow' },
    { id: 'trap', name: 'Trap', tags: '808s, hi-hats, aggressive, dark beats' },
    { id: 'boom-bap', name: 'Boom Bap', tags: 'classic hip-hop, sampled drums, vinyl scratches, 90s' },
    { id: 'conscious-rap', name: 'Conscious Rap', tags: 'lyrical, storytelling, social themes, meaningful' },
    { id: 'gangsta-rap', name: 'Gangsta Rap', tags: 'aggressive, street narratives, hard-hitting beats' },
    { id: 'lo-fi-hip-hop', name: 'Lo-Fi Hip-Hop', tags: 'chill beats, jazzy samples, relaxed, study vibes' },
    
    // Electronic & Dance
    { id: 'synthwave', name: 'Synthwave', tags: '80s retro, analog synths, nostalgic, neon' },
    { id: 'darkwave', name: 'Darkwave', tags: '80s synth, cold atmosphere, melancholic, electronic' },
    { id: 'edm', name: 'EDM', tags: 'high energy, build-ups, drops, festival-ready, electronic' },
    { id: 'house', name: 'House', tags: 'four-on-the-floor, electronic, danceable, groovy' },
    { id: 'techno', name: 'Techno', tags: 'repetitive beats, hypnotic, industrial, minimal' },
    { id: 'trance', name: 'Trance', tags: 'uplifting melodies, build-ups, euphoric, atmospheric' },
    { id: 'dubstep', name: 'Dubstep', tags: 'heavy bass, wobble, half-time beats, aggressive drops' },
    { id: 'drum-and-bass', name: 'Drum and Bass', tags: 'fast breakbeats, heavy bass, energetic, 170 BPM' },
    { id: 'ambient', name: 'Ambient', tags: 'atmospheric, minimal, textural, meditative, ethereal' },
    { id: 'idm', name: 'IDM', tags: 'intelligent dance music, experimental, glitchy, complex' },
    { id: 'trip-hop', name: 'Trip Hop', tags: 'downtempo, atmospheric, hip-hop influence, dark' },
    
    // Jazz & Blues
    { id: 'jazz', name: 'Jazz', tags: 'improvisation, swing, complex harmony, sophisticated' },
    { id: 'smooth-jazz', name: 'Smooth Jazz', tags: 'relaxed, melodic, saxophone, contemporary' },
    { id: 'bebop', name: 'Bebop', tags: 'fast tempo, complex improvisation, virtuosic, 40s' },
    { id: 'blues', name: 'Blues', tags: 'guitar, 12-bar structure, emotional, soulful vocals' },
    { id: 'blues-rock', name: 'Blues Rock', tags: 'electric guitar, blues scales, rock energy, guitar solos' },
    { id: 'ragtime', name: 'Ragtime', tags: 'syncopated piano, 1900s, cheerful, stride bass' },
    
    // Classical & Orchestral
    { id: 'classical', name: 'Classical', tags: 'orchestral, strings, piano, elegant, timeless' },
    { id: 'baroque', name: 'Baroque', tags: 'harpsichord, ornate, counterpoint, 1600s-1700s' },
    { id: 'romantic', name: 'Romantic Classical', tags: 'emotional, expressive, piano, lush orchestration' },
    { id: 'contemporary-classical', name: 'Contemporary Classical', tags: 'modern composition, experimental, minimalist' },
    { id: 'film-score', name: 'Film Score', tags: 'orchestral, cinematic, dramatic, emotional themes' },
    
    // Country & Folk
    { id: 'country', name: 'Country', tags: 'acoustic guitar, storytelling, twangy vocals, heartfelt' },
    { id: 'bluegrass', name: 'Bluegrass', tags: 'banjo, mandolin, fiddle, fast picking, traditional' },
    { id: 'folk', name: 'Folk', tags: 'acoustic, storytelling, traditional, authentic, roots' },
    { id: 'indie-folk', name: 'Indie Folk', tags: 'acoustic guitar, harmonies, introspective, organic' },
    { id: 'americana', name: 'Americana', tags: 'roots music, storytelling, guitar, authentic' },
    
    // Latin & World
    { id: 'reggaeton', name: 'Reggaeton', tags: 'dembow rhythm, Latin, urban, danceable, Spanish' },
    { id: 'salsa', name: 'Salsa', tags: 'brass, percussion, Cuban influence, energetic, danceable' },
    { id: 'bossa-nova', name: 'Bossa Nova', tags: 'Brazilian, gentle rhythm, jazz influence, sophisticated' },
    { id: 'reggae', name: 'Reggae', tags: 'offbeat rhythm, laid-back, Jamaican, positive vibes' },
    { id: 'afrobeat', name: 'Afrobeat', tags: 'polyrhythmic, brass, percussion, funk influence, African' },
    { id: 'flamenco', name: 'Flamenco', tags: 'Spanish guitar, passionate vocals, handclaps, traditional' },
    
    // Experimental & Other
    { id: 'industrial', name: 'Industrial', tags: 'mechanical sounds, harsh, experimental, dark atmosphere' },
    { id: 'noise', name: 'Noise', tags: 'experimental, abrasive, unconventional, avant-garde' },
    { id: 'vaporwave', name: 'Vaporwave', tags: 'slowed samples, 80s aesthetic, nostalgic, surreal' },
    { id: 'lo-fi', name: 'Lo-Fi', tags: 'low fidelity, warm, nostalgic, relaxed, imperfect' },
    { id: 'chiptune', name: 'Chiptune', tags: '8-bit sounds, retro gaming, synthesized, nostalgic' },
    { id: 'cabaret', name: 'Cabaret', tags: 'theatrical, piano, dramatic vocals, vintage, theatrical' }
  ];

  const vocalStyles = {
    heavy: ['Growling', 'Screaming', 'Harsh Vocals', 'Shouted', 'Guttural', 'Power Vocals'],
    atmospheric: ['Whispered', 'Ethereal', 'Operatic', 'Theatrical', 'Haunting', 'Melancholic'],
    clean: ['Smooth', 'Soulful', 'Breathy', 'Powerful', 'Crooner', 'Falsetto']
  };

  const songStructures = {
    standard: ['Intro', 'Verse 1', 'Pre-Chorus', 'Chorus', 'Verse 2', 'Chorus', 'Bridge', 'Final Chorus', 'Outro'],
    progressive: ['Intro', 'Verse 1', 'Interlude', 'Verse 2', 'Build', 'Climax', 'Bridge', 'Outro'],
    heavy: ['Intro', 'Verse 1', 'Pre-Chorus', 'Chorus', 'Breakdown', 'Verse 2', 'Chorus', 'Bridge', 'Final Chorus', 'Outro'],
    atmospheric: ['Long Intro', 'Verse 1', 'Atmospheric Break', 'Verse 2', 'Crescendo', 'Climax', 'Outro'],
    edm: ['Intro', 'Build', 'Drop', 'Verse', 'Build', 'Drop', 'Bridge', 'Final Drop', 'Outro'],
    'pop-standard': ['Intro', 'Verse 1', 'Verse 2', 'Chorus', 'Verse 3', 'Chorus', 'Bridge', 'Chorus', 'Outro'],
    'hip-hop': ['Intro', 'Verse 1', 'Hook', 'Verse 2', 'Hook', 'Verse 3', 'Hook', 'Bridge', 'Final Hook', 'Outro'],
    'rnb-ballad': ['Intro', 'Verse 1', 'Pre-Chorus', 'Chorus', 'Verse 2', 'Pre-Chorus', 'Chorus', 'Bridge', 'Modulated Chorus', 'Outro'],
    classical: ['Introduction', 'Exposition', 'Development', 'Recapitulation', 'Coda'],
    jazz: ['Intro', 'Head', 'Solo Section 1', 'Solo Section 2', 'Head (Reprise)', 'Outro'],
    blues: ['Intro', 'Verse 1', 'Verse 2', 'Solo', 'Verse 3', 'Solo', 'Outro'],
    folk: ['Intro', 'Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Instrumental', 'Verse 3', 'Chorus', 'Outro'],
    punk: ['Intro', 'Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Solo', 'Chorus', 'Outro'],
    ambient: ['Textural Introduction', 'Development 1', 'Development 2', 'Climax', 'Resolution', 'Fade'],
    trap: ['Intro', 'Verse 1', 'Pre-Hook', 'Hook', 'Verse 2', 'Hook', 'Bridge', 'Final Hook', 'Outro']
  };

  const callClaude = async (prompt, systemPrompt = '') => {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            { 
              role: "user", 
              content: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt 
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      let responseText = data.content[0].text;
      
      // Remove markdown code blocks if present
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error calling Claude:", error);
      throw error;
    }
  };

  const generateFromIdea = async () => {
    if (!idea.trim()) {
      setError('Please enter an idea or topic for your song');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genreInfo = genres.find(g => g.id === selectedGenre);
      const languageInfo = languages.find(l => l.id === selectedLanguage);
      
      const systemPrompt = `You are an expert Suno AI music producer. Generate complete song lyrics and style prompt based on user ideas.

CRITICAL RULES:
1. Style prompt MUST be under 600 characters
2. Use metatags format: [Tag], [Tag: Value], [Instrument: Name]
3. Keep tags to MAX 3 words each
4. Line length: 6-12 syllables
5. Use varied song structures (not always the same)
6. Include atmospheric sound effects with *asterisks*
7. Use ALL CAPS for screamed sections
8. Use (parentheses) for backing vocals
9. **LYRICS LANGUAGE**: Generate ALL lyrics in ${languageInfo.name}. This is CRITICAL - the user specifically wants lyrics in ${languageInfo.name}, not English.

Return ONLY valid JSON with this EXACT structure (no additional text):
{
  "stylePrompt": "genre, subgenre, instruments, vocal style, mood, BPM",
  "lyrics": "complete lyrics with metatags IN ${languageInfo.name.toUpperCase()}",
  "structure": ["section1", "section2", ...],
  "suggestedBpm": 120,
  "suggestedMoods": ["dark", "intense"],
  "suggestedInstruments": ["guitar", "drums"]
}`;

      const userPrompt = `Generate a ${genreInfo.name} song based on this idea:

"${idea}"

Genre characteristics: ${genreInfo.tags}

IMPORTANT: Write ALL lyrics in ${languageInfo.name}. Do not use English unless the user specifically requested English.

Create a unique song structure (vary it, don't use standard verse-chorus always). Include creative metatags, atmospheric effects, and dynamic vocal delivery. Make the style prompt concise but descriptive (under 600 chars).

RESPOND ONLY WITH JSON, NO OTHER TEXT.`;

      const result = await callClaude(userPrompt, systemPrompt);
      
      setStylePrompt(result.stylePrompt);
      setLyrics(result.lyrics);
      setStructure(result.structure || []);
      setBpm(result.suggestedBpm || 120);
      
      if (result.suggestedInstruments) {
        setInstruments(result.suggestedInstruments);
      }
      
      setActiveTab('editor');
    } catch (err) {
      setError('Failed to generate song. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const regenerateWithControls = async () => {
    setLoading(true);
    setError(null);

    try {
      const activeVocalists = vocalists.filter(v => v.active);
      
      // Build detailed vocal descriptions
      const vocalistsDesc = activeVocalists.map(v => {
        const genderMap = { male: 'male', female: 'female' };
        const rangeMap = {
          'soprano': 'soprano (high female)',
          'mezzo-soprano': 'mezzo-soprano (mid female)',
          'alto': 'alto (low female)',
          'contralto': 'contralto (very low female)',
          'countertenor': 'countertenor (very high male)',
          'tenor': 'tenor (high male)',
          'baritone': 'baritone (mid male)',
          'bass': 'bass (low male)',
          'bass-baritone': 'bass-baritone (very low male)',
          'androgynous': 'androgynous',
          'child': 'child voice'
        };
        const styleMap = {
          'growling': '[Growling]',
          'screaming': '[Screaming]',
          'harsh': '[Harsh Vocals]',
          'shouted': '[Shouted Vocals]',
          'guttural': '[Guttural Vocals]',
          'death-growl': '[Death Growl]',
          'black-metal-shriek': '[Black Metal Shriek]',
          'whispered': '[Whispered Vocals]',
          'ethereal': '[Ethereal]',
          'operatic': '[Operatic Vocals]',
          'theatrical': '[Theatrical Vocals]',
          'haunting': '[Haunting Vocals]',
          'melancholic': '[Melancholic Vocals]',
          'dramatic': '[Dramatic Vocals]',
          'clean': '[Clean Vocals]',
          'smooth': '[Smooth Vocals]',
          'powerful': '[Powerful Vocals]',
          'bright': '[Bright Vocals]',
          'sweet': '[Sweet Vocals]',
          'breathy': '[Breathy Vocals]',
          'airy': '[Airy Vocals]',
          'soulful': '[Soulful Vocals]',
          'sultry': '[Sultry Vocals]',
          'sensual': '[Sensual Vocals]',
          'gospel': '[Gospel Vocals]',
          'melismatic': '[Melismatic Vocals]',
          'belting': '[Belting]',
          'jazzy': '[Jazzy Vocals]',
          'smoky': '[Smoky Vocals]',
          'bluesy': '[Bluesy Vocals]',
          'raspy': '[Raspy Vocals]',
          'gravelly': '[Gravelly Vocals]',
          'crooner': '[Crooner]',
          'torch-singer': '[Torch Singer]',
          'scat': '[Scat Singing]',
          'rap': '[Rap]',
          'fast-rap': '[Fast Rap]',
          'melodic-rap': '[Melodic Rap]',
          'aggressive-rap': '[Aggressive Rap]',
          'spoken-word': '[Spoken Word]',
          'rhythmic': '[Rhythmic]',
          'twangy': '[Twangy Vocals]',
          'country': '[Country Vocals]',
          'folk': '[Folk Vocals]',
          'storytelling': '[Storytelling]',
          'rustic': '[Rustic Vocals]',
          'heartfelt': '[Heartfelt Vocals]',
          'classical': '[Classical Vocals]',
          'bel-canto': '[Bel Canto]',
          'lyric': '[Lyric Vocals]',
          'coloratura': '[Coloratura]',
          'choral': '[Choral]',
          'gregorian': '[Gregorian Chant]',
          'robotic': '[Robotic Vocals]',
          'vocoded': '[Vocoded]',
          'auto-tuned': '[Auto-Tuned]',
          'distorted': '[Distorted Vocals]',
          'processed': '[Processed Vocals]',
          'chopped': '[Chopped Vocals]',
          'falsetto': '[Falsetto]',
          'head-voice': '[Head Voice]',
          'chest-voice': '[Chest Voice]',
          'mixed-voice': '[Mixed Voice]',
          'vibrato': '[Vibrato]',
          'yodeling': '[Yodeling]',
          'angelic': '[Angelic Vocals]',
          'dark': '[Dark Vocals]',
          'warm': '[Warm Vocals]',
          'cold': '[Cold Vocals]',
          'intimate': '[Intimate Vocals]',
          'energetic': '[Energetic Vocals]',
          'lazy': '[Lazy Vocals]',
          'seductive': '[Seductive Vocals]'
        };
        
        return {
          gender: genderMap[v.gender] || v.gender,
          range: rangeMap[v.range] || v.range,
          styleTag: styleMap[v.style] || `[${v.style}]`,
          styleDesc: v.style
        };
      });

      const genreInfo = genres.find(g => g.id === selectedGenre);
      const languageInfo = languages.find(l => l.id === selectedLanguage);

      const systemPrompt = `You are a Suno AI expert. Regenerate the song applying the specified changes while keeping the core idea.

CRITICAL RULES:
1. Style prompt MUST be under 600 characters
2. Preserve the song's theme and story
3. Use metatags properly with MAX 3 words each
4. Apply ALL the specified changes exactly as requested
5. **LYRICS LANGUAGE**: Generate ALL lyrics in ${languageInfo.name}

VOCAL CONFIGURATION - APPLY THESE EXACTLY:
${vocalistsDesc.map((v, idx) => `Voice ${idx + 1}: ${v.gender} ${v.range} with ${v.styleDesc} delivery - Use tag: ${v.styleTag}`).join('\n')}

MOOD CONFIGURATION: [Mood: ${mood.charAt(0).toUpperCase() + mood.slice(1)}]
ENERGY CONFIGURATION: [Energy: ${energy.charAt(0).toUpperCase() + energy.slice(1)}]
BPM: ${bpm} (include this in style prompt)

INSTRUMENTS TO INCLUDE: ${instruments.length > 0 ? instruments.join(', ') : 'as appropriate for genre'}

SONG STRUCTURE PREFERENCE: ${songStructure} style

You MUST apply these vocal tags, mood, energy, and BPM settings in the regenerated lyrics and style prompt.

Return ONLY valid JSON (no markdown, no extra text):
{
  "stylePrompt": "updated style prompt under 600 chars including BPM ${bpm}",
  "lyrics": "updated lyrics with proper metatags IN ${languageInfo.name.toUpperCase()} - include vocal style tags, mood tags, and energy tags"
}`;

      const userPrompt = `Current song:
STYLE: ${stylePrompt}

LYRICS:
${lyrics}

Apply these MANDATORY changes:

VOICES (use these EXACT tags in appropriate sections):
${vocalistsDesc.map((v, idx) => `- Voice ${idx + 1}: ${v.styleTag} for ${v.gender} ${v.range}`).join('\n')}

MOOD: Apply [Mood: ${mood.charAt(0).toUpperCase() + mood.slice(1)}] tag where appropriate
ENERGY: Apply [Energy: ${energy.charAt(0).toUpperCase() + energy.slice(1)}] tag where appropriate
BPM: Update to ${bpm} BPM (add to style prompt)
INSTRUMENTS: Include ${instruments.length > 0 ? instruments.join(', ') : 'appropriate instruments'}
LANGUAGE: Ensure ALL lyrics are in ${languageInfo.name}

Regenerate the style prompt and lyrics applying ALL these changes. The vocal style tags, mood tags, and energy tags MUST appear in the lyrics metatags.

RESPOND ONLY WITH JSON.`;

      const result = await callClaude(userPrompt, systemPrompt);
      
      setStylePrompt(result.stylePrompt);
      setLyrics(result.lyrics);
    } catch (err) {
      setError('Failed to regenerate. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const optimizeLyrics = async () => {
    setLoading(true);
    setError(null);

    try {
      const genreInfo = genres.find(g => g.id === selectedGenre);
      
      const systemPrompt = `You are a Suno AI lyrics optimizer. Optimize lyrics for the specified genre while preserving meaning.

OPTIMIZATION RULES:
1. Line length: 6-12 syllables optimal
2. Proper metatag usage (max 3 words)
3. Genre-appropriate vocal tags
4. Effective use of ALL CAPS for emphasis
5. Sound effects with *asterisks*
6. Backing vocals in (parentheses)
7. Keep the core story/message

Return ONLY valid JSON:
{
  "optimizedLyrics": "optimized lyrics with tags",
  "changes": ["list of key changes made"]
}`;

      const userPrompt = `Optimize these lyrics for ${genreInfo.name}:

${lyrics}

Genre characteristics: ${genreInfo.tags}

Apply genre-specific optimizations, fix line lengths, improve metatag usage, add atmospheric elements.

RESPOND ONLY WITH JSON.`;

      const result = await callClaude(userPrompt, systemPrompt);
      
      setLyrics(result.optimizedLyrics);
    } catch (err) {
      setError('Failed to optimize lyrics. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addVocalist = () => {
    setVocalists([...vocalists, {
      id: Date.now(),
      gender: 'male',
      range: 'tenor',
      style: 'clean',
      active: true
    }]);
  };

  const updateVocalist = (id, field, value) => {
    setVocalists(vocalists.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const removeVocalist = (id) => {
    setVocalists(vocalists.filter(v => v.id !== id));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addTagToPrompt = (tag) => {
    // Add tag to style prompt with proper formatting
    const currentPrompt = stylePrompt.trim();
    const newPrompt = currentPrompt 
      ? `${currentPrompt}, ${tag}` 
      : tag;
    
    setStylePrompt(newPrompt);
  };

  const removeLastTag = () => {
    const tags = stylePrompt.split(',').map(t => t.trim()).filter(Boolean);
    tags.pop();
    setStylePrompt(tags.join(', '));
  };

  const clearPrompt = () => {
    setStylePrompt('');
  };

  const charLimit = 600;
  const promptLength = stylePrompt.length;
  const isOverLimit = promptLength > charLimit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Suno AI Assistant
          </h1>
          <p className="text-gray-400">Advanced song generation & optimization powered by Claude AI</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'generator'
                ? 'bg-purple-600 text-white border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Wand2 size={20} />
            Generator
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'editor'
                ? 'bg-purple-600 text-white border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings size={20} />
            Editor & Controls
          </button>
          <button
            onClick={() => setActiveTab('reference')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'reference'
                ? 'bg-purple-600 text-white border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText size={20} />
            Quick Reference
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Generator Tab */}
        {activeTab === 'generator' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="text-purple-400" />
                Generate from Idea
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Genre</label>
                    <select
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">
                      {genres.find(g => g.id === selectedGenre)?.tags}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Lyrics Language</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {languages.map(lang => (
                        <option key={lang.id} value={lang.id}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">
                      Language for generated lyrics
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Idea / Topic / Story</label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Examples:&#10;&#10;• A dark industrial track about AI becoming self-aware in a dystopian future&#10;• An upbeat funk song celebrating summer nights and dancing&#10;• A melancholic R&B ballad about lost love and regret&#10;• A fast-paced trap anthem about hustle and success&#10;• A dreamy indie-pop song about childhood memories and nostalgia&#10;• A powerful orchestral piece representing the hero's journey"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-32 resize-y"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Describe your concept, theme, story, or mood. Be as detailed as you want.
                  </p>
                </div>

                <button
                  onClick={generateFromIdea}
                  disabled={loading || !idea.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 px-6 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={20} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 size={20} />
                      Generate Complete Song
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-purple-400" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• The more detailed your idea, the better the generated lyrics</li>
                <li>• <span className="text-purple-400 font-semibold">Choose your lyrics language</span> - works with 18+ languages including Italian, Spanish, Japanese, and more!</li>
                <li>• The AI will create a unique song structure each time (not always verse-chorus)</li>
                <li>• After generation, use the Editor tab to fine-tune vocals, instruments, and mood</li>
                <li>• Style prompts are auto-limited to 600 characters for optimal Suno performance</li>
                <li>• Works with ALL genres: metal, pop, hip-hop, jazz, classical, EDM, and more!</li>
                <li>• Try combining genres for unique results (e.g., "jazz-influenced hip-hop")</li>
              </ul>
            </div>
          </div>
        )}

        {/* Editor Tab */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              {/* Style Prompt Display */}
              <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold flex items-center gap-2">
                    <Music size={18} className="text-purple-400" />
                    Style Prompt
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isOverLimit ? 'text-red-400' : 'text-gray-400'}`}>
                      {promptLength}/{charLimit}
                    </span>
                    <button
                      onClick={() => copyToClipboard(stylePrompt)}
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <textarea
                  value={stylePrompt}
                  onChange={(e) => setStylePrompt(e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-purple-500 min-h-24 resize-y ${
                    isOverLimit ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="industrial metal, distorted guitars, electronic drums, harsh vocals, 120 BPM"
                />
                {isOverLimit && (
                  <p className="text-xs text-red-400 mt-1">⚠️ Prompt exceeds 600 character limit</p>
                )}
                
                {/* Quick Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={removeLastTag}
                    disabled={!stylePrompt}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 rounded text-xs transition-colors"
                  >
                    Remove Last Tag
                  </button>
                  <button
                    onClick={clearPrompt}
                    disabled={!stylePrompt}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 rounded text-xs transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Tag Library */}
              <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-400" />
                  Tag Library
                </h3>
                <p className="text-xs text-gray-400 mb-4">Click tags to add them to your style prompt</p>
                
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                    placeholder="Search tags..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-700 pb-2">
                  {Object.entries(tagLibrary).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTagLibraryCategory(key);
                        setTagSearchQuery('');
                      }}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        tagLibraryCategory === key
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                
                {/* Tags Display */}
                <div className="max-h-48 overflow-y-auto bg-gray-700/30 rounded-lg p-3">
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const currentTags = tagLibrary[tagLibraryCategory].tags;
                      const filteredTags = tagSearchQuery
                        ? currentTags.filter(tag => 
                            tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
                          )
                        : currentTags;
                      
                      if (filteredTags.length === 0) {
                        return (
                          <p className="text-gray-500 text-sm italic w-full text-center py-4">
                            No tags found matching "{tagSearchQuery}"
                          </p>
                        );
                      }
                      
                      return filteredTags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => addTagToPrompt(tag)}
                          disabled={isOverLimit}
                          className="px-3 py-1.5 bg-gray-700 hover:bg-purple-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-xs rounded transition-all hover:scale-105"
                          title={`Add "${tag}" to prompt`}
                        >
                          {tag}
                        </button>
                      ));
                    })()}
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-3">
                  💡 Tip: Tags are added with commas. Keep total under 600 characters for best results.
                </p>
              </div>

              {/* Vocalists Control */}
              <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Mic size={18} className="text-purple-400" />
                    Vocalists
                  </h3>
                  <button
                    onClick={addVocalist}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                  >
                    + Add Voice
                  </button>
                </div>
                
                <div className="space-y-3">
                  {vocalists.map((vocalist, idx) => (
                    <div key={vocalist.id} className="bg-gray-700/50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Voice {idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={vocalist.active}
                              onChange={(e) => updateVocalist(vocalist.id, 'active', e.target.checked)}
                              className="rounded"
                            />
                            Active
                          </label>
                          {vocalists.length > 1 && (
                            <button
                              onClick={() => removeVocalist(vocalist.id)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          value={vocalist.gender}
                          onChange={(e) => updateVocalist(vocalist.id, 'gender', e.target.value)}
                          className="px-2 py-1 bg-gray-600 rounded text-sm"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        
                        <select
                          value={vocalist.range}
                          onChange={(e) => updateVocalist(vocalist.id, 'range', e.target.value)}
                          className="px-2 py-1 bg-gray-600 rounded text-sm"
                        >
                          <optgroup label="Female">
                            <option value="soprano">Soprano (high)</option>
                            <option value="mezzo-soprano">Mezzo-Soprano (mid)</option>
                            <option value="alto">Alto (low)</option>
                            <option value="contralto">Contralto (very low)</option>
                          </optgroup>
                          <optgroup label="Male">
                            <option value="countertenor">Countertenor (very high)</option>
                            <option value="tenor">Tenor (high)</option>
                            <option value="baritone">Baritone (mid)</option>
                            <option value="bass">Bass (low)</option>
                            <option value="bass-baritone">Bass-Baritone (very low)</option>
                          </optgroup>
                          <optgroup label="Other">
                            <option value="androgynous">Androgynous</option>
                            <option value="child">Child Voice</option>
                          </optgroup>
                        </select>
                        
                        <select
                          value={vocalist.style}
                          onChange={(e) => updateVocalist(vocalist.id, 'style', e.target.value)}
                          className="px-2 py-1 bg-gray-600 rounded text-sm"
                        >
                          <optgroup label="Heavy/Aggressive">
                            <option value="growling">Growling</option>
                            <option value="screaming">Screaming</option>
                            <option value="harsh">Harsh</option>
                            <option value="shouted">Shouted</option>
                            <option value="guttural">Guttural</option>
                            <option value="death-growl">Death Growl</option>
                            <option value="black-metal-shriek">Black Metal Shriek</option>
                          </optgroup>
                          <optgroup label="Atmospheric/Gothic">
                            <option value="whispered">Whispered</option>
                            <option value="ethereal">Ethereal</option>
                            <option value="operatic">Operatic</option>
                            <option value="theatrical">Theatrical</option>
                            <option value="haunting">Haunting</option>
                            <option value="melancholic">Melancholic</option>
                            <option value="dramatic">Dramatic</option>
                          </optgroup>
                          <optgroup label="Clean/Pop">
                            <option value="clean">Clean</option>
                            <option value="smooth">Smooth</option>
                            <option value="powerful">Powerful</option>
                            <option value="bright">Bright</option>
                            <option value="sweet">Sweet</option>
                            <option value="breathy">Breathy</option>
                            <option value="airy">Airy</option>
                          </optgroup>
                          <optgroup label="Soul/R&B">
                            <option value="soulful">Soulful</option>
                            <option value="sultry">Sultry</option>
                            <option value="sensual">Sensual</option>
                            <option value="gospel">Gospel</option>
                            <option value="melismatic">Melismatic</option>
                            <option value="belting">Belting</option>
                          </optgroup>
                          <optgroup label="Jazz/Blues">
                            <option value="jazzy">Jazzy</option>
                            <option value="smoky">Smoky</option>
                            <option value="bluesy">Bluesy</option>
                            <option value="raspy">Raspy</option>
                            <option value="gravelly">Gravelly</option>
                            <option value="crooner">Crooner</option>
                            <option value="torch-singer">Torch Singer</option>
                            <option value="scat">Scat</option>
                          </optgroup>
                          <optgroup label="Hip-Hop/Rap">
                            <option value="rap">Rap</option>
                            <option value="fast-rap">Fast Rap</option>
                            <option value="melodic-rap">Melodic Rap</option>
                            <option value="aggressive-rap">Aggressive Rap</option>
                            <option value="spoken-word">Spoken Word</option>
                            <option value="rhythmic">Rhythmic</option>
                          </optgroup>
                          <optgroup label="Country/Folk">
                            <option value="twangy">Twangy</option>
                            <option value="country">Country</option>
                            <option value="folk">Folk</option>
                            <option value="storytelling">Storytelling</option>
                            <option value="rustic">Rustic</option>
                            <option value="heartfelt">Heartfelt</option>
                          </optgroup>
                          <optgroup label="Classical/Choral">
                            <option value="classical">Classical</option>
                            <option value="bel-canto">Bel Canto</option>
                            <option value="lyric">Lyric</option>
                            <option value="coloratura">Coloratura</option>
                            <option value="choral">Choral</option>
                            <option value="gregorian">Gregorian Chant</option>
                          </optgroup>
                          <optgroup label="Electronic/Processed">
                            <option value="robotic">Robotic</option>
                            <option value="vocoded">Vocoded</option>
                            <option value="auto-tuned">Auto-Tuned</option>
                            <option value="distorted">Distorted</option>
                            <option value="processed">Processed</option>
                            <option value="chopped">Chopped</option>
                          </optgroup>
                          <optgroup label="Special Techniques">
                            <option value="falsetto">Falsetto</option>
                            <option value="head-voice">Head Voice</option>
                            <option value="chest-voice">Chest Voice</option>
                            <option value="mixed-voice">Mixed Voice</option>
                            <option value="vibrato">Vibrato</option>
                            <option value="yodeling">Yodeling</option>
                          </optgroup>
                          <optgroup label="Character/Mood">
                            <option value="angelic">Angelic</option>
                            <option value="dark">Dark</option>
                            <option value="warm">Warm</option>
                            <option value="cold">Cold</option>
                            <option value="intimate">Intimate</option>
                            <option value="energetic">Energetic</option>
                            <option value="lazy">Lazy</option>
                            <option value="seductive">Seductive</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instruments */}
              <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Volume2 size={18} className="text-purple-400" />
                  Instruments
                </h3>
                <input
                  type="text"
                  value={instruments.join(', ')}
                  onChange={(e) => setInstruments(e.target.value.split(',').map(i => i.trim()).filter(Boolean))}
                  placeholder="distorted guitar, heavy drums, synth pads, bass"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-400 mt-2">Separate with commas</p>
              </div>

              {/* Mood & Energy & BPM */}
              <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Sliders size={16} className="text-purple-400" />
                    Mood
                  </label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  >
                    <optgroup label="Dark/Heavy">
                      <option value="dark">Dark</option>
                      <option value="ominous">Ominous</option>
                      <option value="sinister">Sinister</option>
                      <option value="brooding">Brooding</option>
                      <option value="menacing">Menacing</option>
                      <option value="grim">Grim</option>
                      <option value="foreboding">Foreboding</option>
                    </optgroup>
                    <optgroup label="Intense/Aggressive">
                      <option value="intense">Intense</option>
                      <option value="aggressive">Aggressive</option>
                      <option value="fierce">Fierce</option>
                      <option value="powerful">Powerful</option>
                      <option value="explosive">Explosive</option>
                      <option value="relentless">Relentless</option>
                    </optgroup>
                    <optgroup label="Sad/Melancholic">
                      <option value="melancholic">Melancholic</option>
                      <option value="sad">Sad</option>
                      <option value="sorrowful">Sorrowful</option>
                      <option value="mournful">Mournful</option>
                      <option value="tragic">Tragic</option>
                      <option value="heartbroken">Heartbroken</option>
                      <option value="nostalgic">Nostalgic</option>
                      <option value="bittersweet">Bittersweet</option>
                    </optgroup>
                    <optgroup label="Atmospheric/Ambient">
                      <option value="atmospheric">Atmospheric</option>
                      <option value="haunting">Haunting</option>
                      <option value="ethereal">Ethereal</option>
                      <option value="dreamy">Dreamy</option>
                      <option value="mystical">Mystical</option>
                      <option value="mysterious">Mysterious</option>
                      <option value="eerie">Eerie</option>
                      <option value="otherworldly">Otherworldly</option>
                      <option value="hypnotic">Hypnotic</option>
                    </optgroup>
                    <optgroup label="Epic/Cinematic">
                      <option value="epic">Epic</option>
                      <option value="cinematic">Cinematic</option>
                      <option value="grandiose">Grandiose</option>
                      <option value="majestic">Majestic</option>
                      <option value="triumphant">Triumphant</option>
                      <option value="heroic">Heroic</option>
                      <option value="dramatic">Dramatic</option>
                    </optgroup>
                    <optgroup label="Happy/Uplifting">
                      <option value="uplifting">Uplifting</option>
                      <option value="happy">Happy</option>
                      <option value="joyful">Joyful</option>
                      <option value="cheerful">Cheerful</option>
                      <option value="euphoric">Euphoric</option>
                      <option value="celebratory">Celebratory</option>
                      <option value="optimistic">Optimistic</option>
                      <option value="blissful">Blissful</option>
                    </optgroup>
                    <optgroup label="Romantic/Sensual">
                      <option value="romantic">Romantic</option>
                      <option value="sensual">Sensual</option>
                      <option value="passionate">Passionate</option>
                      <option value="intimate">Intimate</option>
                      <option value="sultry">Sultry</option>
                      <option value="seductive">Seductive</option>
                      <option value="tender">Tender</option>
                      <option value="loving">Loving</option>
                    </optgroup>
                    <optgroup label="Energetic/Dance">
                      <option value="energetic">Energetic</option>
                      <option value="upbeat">Upbeat</option>
                      <option value="groovy">Groovy</option>
                      <option value="funky">Funky</option>
                      <option value="danceable">Danceable</option>
                      <option value="vibrant">Vibrant</option>
                      <option value="lively">Lively</option>
                      <option value="exhilarating">Exhilarating</option>
                    </optgroup>
                    <optgroup label="Chill/Relaxed">
                      <option value="chill">Chill</option>
                      <option value="relaxed">Relaxed</option>
                      <option value="laid-back">Laid-back</option>
                      <option value="mellow">Mellow</option>
                      <option value="smooth">Smooth</option>
                      <option value="peaceful">Peaceful</option>
                      <option value="tranquil">Tranquil</option>
                      <option value="serene">Serene</option>
                      <option value="meditative">Meditative</option>
                    </optgroup>
                    <optgroup label="Rebellious/Edgy">
                      <option value="rebellious">Rebellious</option>
                      <option value="defiant">Defiant</option>
                      <option value="edgy">Edgy</option>
                      <option value="raw">Raw</option>
                      <option value="gritty">Gritty</option>
                      <option value="visceral">Visceral</option>
                    </optgroup>
                    <optgroup label="Thoughtful/Introspective">
                      <option value="introspective">Introspective</option>
                      <option value="contemplative">Contemplative</option>
                      <option value="reflective">Reflective</option>
                      <option value="philosophical">Philosophical</option>
                      <option value="pensive">Pensive</option>
                      <option value="wistful">Wistful</option>
                    </optgroup>
                    <optgroup label="Playful/Fun">
                      <option value="playful">Playful</option>
                      <option value="whimsical">Whimsical</option>
                      <option value="quirky">Quirky</option>
                      <option value="fun">Fun</option>
                      <option value="lighthearted">Lighthearted</option>
                      <option value="carefree">Carefree</option>
                    </optgroup>
                    <optgroup label="Experimental/Avant-garde">
                      <option value="experimental">Experimental</option>
                      <option value="avant-garde">Avant-garde</option>
                      <option value="unconventional">Unconventional</option>
                      <option value="chaotic">Chaotic</option>
                      <option value="abstract">Abstract</option>
                      <option value="surreal">Surreal</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Energy</label>
                  <select
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="dynamic">Dynamic (varying)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-purple-400" />
                    BPM: {bpm}
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="200"
                    value={bpm}
                    onChange={(e) => setBpm(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Grave (40)</span>
                    <span>Moderato (120)</span>
                    <span>Presto (200)</span>
                  </div>
                </div>
              </div>

              {/* Structure Preference */}
              <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
                <label className="block text-sm font-medium mb-2">Song Structure Preference</label>
                <select
                  value={songStructure}
                  onChange={(e) => setSongStructure(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                >
                  <optgroup label="Rock/Metal">
                    <option value="standard">Standard (Verse-Chorus)</option>
                    <option value="progressive">Progressive (Complex)</option>
                    <option value="heavy">Heavy (with Breakdown)</option>
                    <option value="punk">Punk (Fast & Simple)</option>
                  </optgroup>
                  <optgroup label="Electronic/Dance">
                    <option value="edm">EDM (Build-Drop)</option>
                    <option value="atmospheric">Atmospheric (Ambient)</option>
                    <option value="ambient">Ambient (Textural)</option>
                  </optgroup>
                  <optgroup label="Pop/R&B">
                    <option value="pop-standard">Pop Standard</option>
                    <option value="rnb-ballad">R&B Ballad</option>
                  </optgroup>
                  <optgroup label="Hip-Hop/Rap">
                    <option value="hip-hop">Hip-Hop (Verse-Hook)</option>
                    <option value="trap">Trap</option>
                  </optgroup>
                  <optgroup label="Traditional">
                    <option value="blues">Blues (12-bar style)</option>
                    <option value="jazz">Jazz (Head-Solo-Head)</option>
                    <option value="folk">Folk (Verse-Chorus)</option>
                    <option value="classical">Classical (Sonata form)</option>
                  </optgroup>
                </select>
                <p className="text-xs text-gray-400 mt-2">
                  Structure: {songStructures[songStructure]?.join(' → ')}
                </p>
              </div>

              {/* Action Buttons */}
              <button
                onClick={regenerateWithControls}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <RefreshCw size={20} />
                    Regenerate with Current Settings
                  </>
                )}
              </button>

              <button
                onClick={optimizeLyrics}
                disabled={loading || !lyrics}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Optimize Lyrics for Genre
                  </>
                )}
              </button>
            </div>

            {/* Right Column - Lyrics Editor */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold flex items-center gap-2">
                    <FileText size={18} className="text-purple-400" />
                    Lyrics with Metatags
                  </h3>
                  <button
                    onClick={() => copyToClipboard(lyrics)}
                    className="p-2 hover:bg-gray-700 rounded transition-colors"
                    title="Copy lyrics"
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
                <textarea
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm min-h-96 resize-y"
                  placeholder="[Verse 1]&#10;[Mood: Dark]&#10;Your lyrics will appear here...&#10;&#10;[Chorus]&#10;[Energy: High]&#10;Chorus lyrics..."
                />
                <p className="text-xs text-gray-400 mt-2">
                  Edit directly or use controls to regenerate. Tags in [brackets] guide Suno.
                </p>
              </div>

              {structure.length > 0 && (
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
                  <h4 className="font-bold mb-3">Detected Structure</h4>
                  <div className="flex flex-wrap gap-2">
                    {structure.map((section, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-sm"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reference Tab */}
        {activeTab === 'reference' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">Essential Metatag Rules</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <span className="text-purple-400 font-mono">[Tag]</span> - Simple tags (Verse, Chorus, Bridge)</li>
                <li>• <span className="text-purple-400 font-mono">[Tag: Value]</span> - Value tags (Mood: Dark)</li>
                <li>• <span className="font-bold">Max 3 words</span> per tag or it gets sung</li>
                <li>• Place important tags in <span className="font-bold">first 3-5 lines</span></li>
                <li>• <span className="font-bold">6-12 syllables</span> per lyrics line optimal</li>
                <li>• <span className="font-bold">ALL CAPS</span> for screamed sections</li>
                <li>• <span className="font-mono">(parentheses)</span> for backing vocals</li>
                <li>• <span className="font-mono">*asterisks*</span> for sound effects</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">Common Structure Tags</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-purple-400">[Verse]</span> ⭐⭐⭐⭐⭐</div>
                <div><span className="text-purple-400">[Chorus]</span> ⭐⭐⭐⭐⭐</div>
                <div><span className="text-purple-400">[Pre-Chorus]</span> ⭐⭐⭐⭐</div>
                <div><span className="text-purple-400">[Bridge]</span> ⭐⭐⭐⭐</div>
                <div><span className="text-purple-400">[Breakdown]</span> ⭐⭐⭐⭐</div>
                <div><span className="text-purple-400">[Drop]</span> ⭐⭐⭐⭐⭐</div>
                <div><span className="text-purple-400">[Outro]</span> ⭐⭐⭐</div>
                <div><span className="text-red-400">[Intro]</span> ⭐⭐ Bad!</div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                ⚠️ For intros, use "short instrumental intro" in style prompt instead of [Intro] tag
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">Vocal Style Tags</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-purple-400 font-medium mb-1">Heavy/Aggressive</h4>
                  <p className="text-gray-300">
                    [Growling], [Screaming], [Harsh Vocals], [Guttural Vocals], [Shouted Vocals], [Death Growl]
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium mb-1">Atmospheric/Gothic</h4>
                  <p className="text-gray-300">
                    [Whispered Vocals], [Ethereal], [Operatic Vocals], [Theatrical Vocals], [Haunting Vocals]
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium mb-1">Pop/Clean</h4>
                  <p className="text-gray-300">
                    [Smooth Vocals], [Powerful Vocals], [Bright], [Sweet], [Breathy Vocals], [Airy]
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium mb-1">Soul/R&B</h4>
                  <p className="text-gray-300">
                    [Soulful], [Sultry], [Gospel], [Melismatic], [Belting], [Sensual]
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium mb-1">Jazz/Blues</h4>
                  <p className="text-gray-300">
                    [Jazzy], [Smoky], [Bluesy], [Raspy], [Gravelly], [Crooner], [Torch Singer], [Scat]
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium mb-1">Hip-Hop/Rap</h4>
                  <p className="text-gray-300">
                    [Rap], [Fast Rap], [Melodic Rap], [Aggressive Rap], [Spoken Word], [Rhythmic]
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium mb-1">Country/Folk</h4>
                  <p className="text-gray-300">
                    [Twangy], [Country], [Folk], [Storytelling], [Rustic], [Heartfelt]
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">Control Tags</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-purple-400">[Mood: Dark/Intense/Melancholic]</span></div>
                <div><span className="text-purple-400">[Energy: High/Medium/Low]</span></div>
                <div><span className="text-purple-400">[Dynamic: Crescendo]</span></div>
                <div><span className="text-purple-400">[Harmony: Yes]</span></div>
                <div><span className="text-purple-400">[Instrument: Guitar (Distorted)]</span></div>
                <div><span className="text-purple-400">[Vocal Effect: Reverb/Delay]</span></div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">Formatting Tricks</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <span className="font-mono">BURN IT DOWN!</span> - ALL CAPS for screaming</li>
                <li>• <span className="font-mono">Oooohhh!</span> - Extended vowels for sustained notes</li>
                <li>• <span className="font-mono">lo-o-o-ove</span> - Dashes to stretch syllables</li>
                <li>• <span className="font-mono">(oh yeah!)</span> - Parentheses for backing vocals</li>
                <li>• <span className="font-mono">*thunder*</span> - Asterisks for sound effects</li>
                <li>• <span className="font-mono">...</span> - Ellipsis to slow delivery</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">BPM Guide by Genre</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Ambient/Drone</span><span className="text-gray-400">40-60</span></div>
                <div className="flex justify-between"><span>Funeral Doom</span><span className="text-gray-400">40-60</span></div>
                <div className="flex justify-between"><span>Doom Metal</span><span className="text-gray-400">60-80</span></div>
                <div className="flex justify-between"><span>Blues</span><span className="text-gray-400">60-90</span></div>
                <div className="flex justify-between"><span>Ballad/Slow</span><span className="text-gray-400">70-90</span></div>
                <div className="flex justify-between"><span>Trip Hop</span><span className="text-gray-400">80-100</span></div>
                <div className="flex justify-between"><span>R&B/Soul</span><span className="text-gray-400">80-110</span></div>
                <div className="flex justify-between"><span>Reggae</span><span className="text-gray-400">80-110</span></div>
                <div className="flex justify-between"><span>Hip-Hop/Boom Bap</span><span className="text-gray-400">85-95</span></div>
                <div className="flex justify-between"><span>Lo-Fi Hip-Hop</span><span className="text-gray-400">85-95</span></div>
                <div className="flex justify-between"><span>Mid-tempo Rock</span><span className="text-gray-400">90-110</span></div>
                <div className="flex justify-between"><span>Pop</span><span className="text-gray-400">100-130</span></div>
                <div className="flex justify-between"><span>Funk</span><span className="text-gray-400">100-120</span></div>
                <div className="flex justify-between"><span>Industrial/Gothic</span><span className="text-gray-400">110-130</span></div>
                <div className="flex justify-between"><span>House</span><span className="text-gray-400">120-130</span></div>
                <div className="flex justify-between"><span>Disco</span><span className="text-gray-400">115-130</span></div>
                <div className="flex justify-between"><span>Techno</span><span className="text-gray-400">120-140</span></div>
                <div className="flex justify-between"><span>Metal/Hard Rock</span><span className="text-gray-400">120-140</span></div>
                <div className="flex justify-between"><span>Trance</span><span className="text-gray-400">130-150</span></div>
                <div className="flex justify-between"><span>Trap</span><span className="text-gray-400">130-150</span></div>
                <div className="flex justify-between"><span>Dubstep</span><span className="text-gray-400">140</span></div>
                <div className="flex justify-between"><span>Thrash/Speed Metal</span><span className="text-gray-400">140-180</span></div>
                <div className="flex justify-between"><span>Drum & Bass</span><span className="text-gray-400">160-180</span></div>
                <div className="flex justify-between"><span>Hardcore/Gabber</span><span className="text-gray-400">160-200</span></div>
                <div className="flex justify-between"><span>Extreme Metal</span><span className="text-gray-400">180-220</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SunoAIAssistant;