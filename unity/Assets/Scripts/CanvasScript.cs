using System.Collections;
using System.Collections.Generic;
using System;
using System.Runtime.InteropServices;

using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

using TMPro;


public class CanvasScript : MonoBehaviour
{
  public Image targetImage;

  IEnumerator GetImage()
  {
    string url = "http://localhost:8000/photo";
    UnityWebRequest www = UnityWebRequestTexture.GetTexture(url);
    yield return www.SendWebRequest();

    if (www.result == UnityWebRequest.Result.ConnectionError)
    {
      Debug.Log(www.error);
    }
    else
    {
      Texture2D myTexture = DownloadHandlerTexture.GetContent(www);

      Sprite newSprite = Sprite.Create(myTexture, new Rect(0, 0, myTexture.width, myTexture.height), new Vector2(.5f, .5f));
      targetImage.sprite = newSprite;
    }
  }

  public void DisplayImage()
  {
    StartCoroutine(GetImage());
  }
    

}
