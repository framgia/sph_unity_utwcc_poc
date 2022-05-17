using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class AudioScript : MonoBehaviour
{
  AudioSource audioSource;
  AudioClip audioClip;

  IEnumerator GetAudioClip()
  {
    using (UnityWebRequest www = UnityWebRequestMultimedia.GetAudioClip("http://localhost:3001/audio", AudioType.WAV))
    {
      yield return www.SendWebRequest();
      if (www.result == UnityWebRequest.Result.ConnectionError)
      {
        Debug.Log(www.error);
      }
      else
      {
        audioClip = DownloadHandlerAudioClip.GetContent(www);
        audioSource.clip = audioClip;
        audioSource.Play();
      }
    }
  }

  public void PlayAudio()
  {
    audioSource = GetComponent<AudioSource>();
    StartCoroutine(GetAudioClip());
  }
}
