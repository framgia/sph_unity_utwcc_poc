using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScalerScript : MonoBehaviour
{
  public GameObject cube;

  public void UpdateObjectScale(float scale)
  {
    Vector3 sizeChange;
    sizeChange.x = scale;
    sizeChange.y = scale;
    sizeChange.z = 1;

    cube.transform.localScale = sizeChange;
  }

  public void UpdateObjectColor(string colorHex)
  {
    var renderer = cube.GetComponent<Renderer>();

    Color color;
    if (ColorUtility.TryParseHtmlString(colorHex, out color))
    {
      renderer.material.color = color;
    }
  }
}
