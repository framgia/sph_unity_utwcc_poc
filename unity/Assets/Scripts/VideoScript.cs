using System;
using UnityEngine;
using UnityEngine.UI;

public class VideoScript : MonoBehaviour
{
    public Image targetImage;
    private void Start(){
        DisableImage();
    }
    
    public void EnableImage(){
        targetImage.enabled = true;
    }

    public void DisableImage(){
        targetImage.enabled = false;
    }

    public void DisplayImage(string cleanedImageB64)
    {
        try{
            byte[] imageBytes = Convert.FromBase64String(cleanedImageB64);
            Texture2D tex = new Texture2D(2, 2);
            tex.LoadImage(imageBytes);
            Sprite newSprite = Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), new Vector2(.5f, .5f));
            targetImage.sprite = newSprite;
        }catch{
            print("Invalid B64");
        }
    }
}
