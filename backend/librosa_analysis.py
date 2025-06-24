import librosa # type: ignore
import numpy as np # type: ignore


def get_vocal_analysis(wav):
    y, sr = librosa.load(wav)

    f0, voiced_flag, voiced_probs = librosa.pyin(
        y,
        fmin=librosa.note_to_hz('C2'),
        fmax=librosa.note_to_hz('C7')
    )

    f0_clean = f0[~np.isnan(f0)]

    if f0_clean.size == 0:
        min_pitch = np.nan
        max_pitch = np.nan
        mean_pitch = np.nan
    else:
        min_pitch = np.nanmin(f0_clean)
        max_pitch = np.nanmax(f0_clean)
        mean_pitch = np.nanmean(f0)

    def hz_to_note(freq):
        return librosa.hz_to_note(freq) if not np.isnan(freq) else "N/A"

    rms = librosa.feature.rms(y=y)[0]
    average_energy_val = np.mean(rms).item() if rms.size > 0 else 0.0

    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfccs_mean = np.mean(mfccs, axis=1)

    vocal_data = {
        "lowest_hz": round(min_pitch.item(), 3) if not np.isnan(min_pitch) and min_pitch is not None else None,
        "highest_hz": round(max_pitch.item(), 3) if not np.isnan(max_pitch) and max_pitch is not None else None,
        "average_hz": round(mean_pitch.item(), 3) if not np.isnan(mean_pitch) and mean_pitch is not None else None,
        "average_note": hz_to_note(mean_pitch),
        "average_energy": round(average_energy_val, 3) if average_energy_val is not None else None,
        "mfccs": [round(val, 3) for val in mfccs_mean[:5].tolist()]
    }
    # print(vocal_data)
    return vocal_data