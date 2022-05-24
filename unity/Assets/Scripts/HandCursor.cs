using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HandCursor : MonoBehaviour
{
    public Texture2D cursor;
    // Start is called before the first frame update
    public void OnMouseEnter()
    {
        Cursor.SetCursor (cursor, Vector2.zero, CursorMode.Auto);
    }
    
    public void OnMouseExit()
    {
        Cursor.SetCursor(null, Vector2.zero, CursorMode.Auto);
    }
}
