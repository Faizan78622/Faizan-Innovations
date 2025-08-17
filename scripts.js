
        function toggleTheme() {
            const body = document.body;
            body.classList.toggle('light-theme');
            body.classList.toggle('dark-theme');
            const toggle = document.querySelector('.theme-toggle');
            toggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
        }

        document.addEventListener('DOMContentLoaded', function() {
            const playAllButton = document.getElementById('playAll');
            const playAyahButtons = document.querySelectorAll('.play-ayah');
            const playAllDuasButton = document.getElementById('playAllDuas');
            const playDuaButtons = document.querySelectorAll('.play-dua');
            const playAllNamazButton = document.getElementById('playAllNamaz');
            const playNamazButtons = document.querySelectorAll('.play-namaz');
            const playAllTasbihButton = document.getElementById('playAllTasbih');
            const playTasbihButtons = document.querySelectorAll('.play-tasbih');
            let currentAyahIndex = 0;
            let currentDuaIndex = 0;
            let currentNamazIndex = 0;
            let currentTasbihIndex = 0;
            let isPlayingAllAyahs = false;
            let isPlayingAllDuas = false;
            let isPlayingAllNamaz = false;
            let isPlayingAllTasbih = false;

            function stopAllAudios() {
                document.querySelectorAll('audio').forEach(audio => {
                    audio.pause();
                    audio.currentTime = 0;
                });
                document.querySelectorAll('.play-btn').forEach(button => {
                    button.textContent = button.classList.contains('play-ayah') ? 'Play Ayah' :
                                         button.classList.contains('play-dua') ? 'Play Dua' :
                                         button.classList.contains('play-namaz') ? 'Play Namaz' : 'Play Tasbih';
                    button.disabled = false;
                });
            }

            function playAyah(index) {
                stopAllAudios();
                const ayahCard = document.querySelectorAll('.ayah-card')[index];
                if (!ayahCard) return;
                const arabicAudio = ayahCard.querySelector('.arabic-audio');
                const translationAudio = ayahCard.querySelector('.translation-audio');
                const playButton = ayahCard.querySelector('.play-ayah');

                if (!arabicAudio || !translationAudio) {
                    console.error('Audio elements missing for ayah', index);
                    playButton.textContent = 'Play Ayah';
                    playButton.disabled = false;
                    if (isPlayingAllAyahs && index + 1 < document.querySelectorAll('.ayah-card').length) {
                        currentAyahIndex++;
                        playAyah(currentAyahIndex);
                    }
                    return;
                }

                playButton.textContent = 'Playing...';
                playButton.disabled = true;
                ayahCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

                arabicAudio.play().catch(error => {
                    console.error('Arabic audio play failed:', error);
                    playButton.textContent = 'Play Ayah';
                    playButton.disabled = false;
                    if (isPlayingAllAyahs && index + 1 < document.querySelectorAll('.ayah-card').length) {
                        currentAyahIndex++;
                        playAyah(currentAyahIndex);
                    }
                });
                arabicAudio.onended = function() {
                    translationAudio.play().catch(error => {
                        console.error('Translation audio play failed:', error);
                        if (isPlayingAllAyahs && index + 1 < document.querySelectorAll('.ayah-card').length) {
                            currentAyahIndex++;
                            playAyah(currentAyahIndex);
                        }
                    });
                    translationAudio.onended = function() {
                        playButton.textContent = 'Play Ayah';
                        playButton.disabled = false;
                        if (isPlayingAllAyahs && index + 1 < document.querySelectorAll('.ayah-card').length) {
                            currentAyahIndex++;
                            playAyah(currentAyahIndex);
                        }
                    };
                };
            }

            function playDua(index) {
                stopAllAudios();
                const duaCard = document.querySelectorAll('.dua-card')[index];
                if (!duaCard) return;
                const duaAudio = duaCard.querySelector('.dua-audio');
                const duaTranslationAudio = duaCard.querySelector('.dua-translation-audio');
                const playButton = duaCard.querySelector('.play-dua');

                if (!duaAudio) {
                    console.error('Dua audio missing for dua', index);
                    playButton.textContent = 'Play Dua';
                    playButton.disabled = false;
                    if (isPlayingAllDuas && index + 1 < document.querySelectorAll('.dua-card').length) {
                        currentDuaIndex++;
                        playDua(currentDuaIndex);
                    }
                    return;
                }

                playButton.textContent = 'Playing...';
                playButton.disabled = true;
                duaCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

                duaAudio.play().catch(error => {
                    console.error('Dua audio play failed:', error);
                    playButton.textContent = 'Play Dua';
                    playButton.disabled = false;
                    if (isPlayingAllDuas && index + 1 < document.querySelectorAll('.dua-card').length) {
                        currentDuaIndex++;
                        playDua(currentDuaIndex);
                    }
                });
                duaAudio.onended = function() {
                    if (duaTranslationAudio) {
                        duaTranslationAudio.play().catch(error => {
                            console.error('Dua translation audio play failed:', error);
                            if (isPlayingAllDuas && index + 1 < document.querySelectorAll('.dua-card').length) {
                                currentDuaIndex++;
                                playDua(currentDuaIndex);
                            }
                        });
                        duaTranslationAudio.onended = function() {
                            playButton.textContent = 'Play Dua';
                            playButton.disabled = false;
                            if (isPlayingAllDuas && index + 1 < document.querySelectorAll('.dua-card').length) {
                                currentDuaIndex++;
                                playDua(currentDuaIndex);
                            }
                        };
                    } else {
                        playButton.textContent = 'Play Dua';
                        playButton.disabled = false;
                        if (isPlayingAllDuas && index + 1 < document.querySelectorAll('.dua-card').length) {
                            currentDuaIndex++;
                            playDua(currentDuaIndex);
                        }
                    }
                };
            }

            function playNamaz(index) {
                stopAllAudios();
                const namazCard = document.querySelectorAll('.namaz-card')[index];
                if (!namazCard) return;
                const namazAudio = namazCard.querySelector('.namaz-audio');
                const namazTranslationAudio = namazCard.querySelector('.namaz-translation-audio');
                const playButton = namazCard.querySelector('.play-namaz');

                if (!namazAudio) {
                    console.error('Namaz audio missing for namaz', index);
                    playButton.textContent = 'Play Namaz';
                    playButton.disabled = false;
                    if (isPlayingAllNamaz && index + 1 < document.querySelectorAll('.namaz-card').length) {
                        currentNamazIndex++;
                        playNamaz(currentNamazIndex);
                    }
                    return;
                }

                playButton.textContent = 'Playing...';
                playButton.disabled = true;
                namazCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

                namazAudio.play().catch(error => {
                    console.error('Namaz audio play failed:', error);
                    playButton.textContent = 'Play Namaz';
                    playButton.disabled = false;
                    if (isPlayingAllNamaz && index + 1 < document.querySelectorAll('.namaz-card').length) {
                        currentNamazIndex++;
                        playNamaz(currentNamazIndex);
                    }
                });
                namazAudio.onended = function() {
                    if (namazTranslationAudio) {
                        namazTranslationAudio.play().catch(error => {
                            console.error('Namaz translation audio play failed:', error);
                            if (isPlayingAllNamaz && index + 1 < document.querySelectorAll('.namaz-card').length) {
                                currentNamazIndex++;
                                playNamaz(currentNamazIndex);
                            }
                        });
                        namazTranslationAudio.onended = function() {
                            playButton.textContent = 'Play Namaz';
                            playButton.disabled = false;
                            if (isPlayingAllNamaz && index + 1 < document.querySelectorAll('.namaz-card').length) {
                                currentNamazIndex++;
                                playNamaz(currentNamazIndex);
                            }
                        };
                    } else {
                        playButton.textContent = 'Play Namaz';
                        playButton.disabled = false;
                        if (isPlayingAllNamaz && index + 1 < document.querySelectorAll('.namaz-card').length) {
                            currentNamazIndex++;
                            playNamaz(currentNamazIndex);
                        }
                    }
                };
            }

            function playTasbih(index) {
                stopAllAudios();
                const tasbihCard = document.querySelectorAll('.tasbih-card')[index];
                if (!tasbihCard) return;
                const tasbihAudio = tasbihCard.querySelector('.tasbih-audio');
                const tasbihTranslationAudio = tasbihCard.querySelector('.tasbih-translation-audio');
                const playButton = tasbihCard.querySelector('.play-tasbih');

                if (!tasbihAudio) {
                    console.error('Tasbih audio missing for tasbih', index);
                    playButton.textContent = 'Play Tasbih';
                    playButton.disabled = false;
                    if (isPlayingAllTasbih && index + 1 < document.querySelectorAll('.tasbih-card').length) {
                        currentTasbihIndex++;
                        playTasbih(currentTasbihIndex);
                    }
                    return;
                }

                playButton.textContent = 'Playing...';
                playButton.disabled = true;
                tasbihCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

                tasbihAudio.play().catch(error => {
                    console.error('Tasbih audio play failed:', error);
                    playButton.textContent = 'Play Tasbih';
                    playButton.disabled = false;
                    if (isPlayingAllTasbih && index + 1 < document.querySelectorAll('.tasbih-card').length) {
                        currentTasbihIndex++;
                        playTasbih(currentTasbihIndex);
                    }
                });
                tasbihAudio.onended = function() {
                    if (tasbihTranslationAudio) {
                        tasbihTranslationAudio.play().catch(error => {
                            console.error('Tasbih translation audio play failed:', error);
                            if (isPlayingAllTasbih && index + 1 < document.querySelectorAll('.tasbih-card').length) {
                                currentTasbihIndex++;
                                playTasbih(currentTasbihIndex);
                            }
                        });
                        tasbihTranslationAudio.onended = function() {
                            playButton.textContent = 'Play Tasbih';
                            playButton.disabled = false;
                            if (isPlayingAllTasbih && index + 1 < document.querySelectorAll('.tasbih-card').length) {
                                currentTasbihIndex++;
                                playTasbih(currentTasbihIndex);
                            }
                        };
                    } else {
                        playButton.textContent = 'Play Tasbih';
                        playButton.disabled = false;
                        if (isPlayingAllTasbih && index + 1 < document.querySelectorAll('.tasbih-card').length) {
                            currentTasbihIndex++;
                            playTasbih(currentTasbihIndex);
                        }
                    }
                };
            }

            playAllButton && playAllButton.addEventListener('click', function() {
                stopAllAudios();
                isPlayingAllAyahs = true;
                currentAyahIndex = 0;
                playAyah(currentAyahIndex);
            });

            playAyahButtons.forEach((button, index) => {
                button.addEventListener('click', function() {
                    stopAllAudios();
                    isPlayingAllAyahs = false;
                    currentAyahIndex = index;
                    playAyah(index);
                });
            });

            playAllDuasButton && playAllDuasButton.addEventListener('click', function() {
                stopAllAudios();
                isPlayingAllDuas = true;
                currentDuaIndex = 0;
                playDua(currentDuaIndex);
            });

            playDuaButtons.forEach((button, index) => {
                button.addEventListener('click', function() {
                    stopAllAudios();
                    isPlayingAllDuas = false;
                    currentDuaIndex = index;
                    playDua(index);
                });
            });

            playAllNamazButton && playAllNamazButton.addEventListener('click', function() {
                stopAllAudios();
                isPlayingAllNamaz = true;
                currentNamazIndex = 0;
                playNamaz(currentNamazIndex);
            });

            playNamazButtons.forEach((button, index) => {
                button.addEventListener('click', function() {
                    stopAllAudios();
                    isPlayingAllNamaz = false;
                    currentNamazIndex = index;
                    playNamaz(index);
                });
            });

            playAllTasbihButton && playAllTasbihButton.addEventListener('click', function() {
                stopAllAudios();
                isPlayingAllTasbih = true;
                currentTasbihIndex = 0;
                playTasbih(currentTasbihIndex);
            });

            playTasbihButtons.forEach((button, index) => {
                button.addEventListener('click', function() {
                    stopAllAudios();
                    isPlayingAllTasbih = false;
                    currentTasbihIndex = index;
                    playTasbih(index);
                });
            });
        });
    
