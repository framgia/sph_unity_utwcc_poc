using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System.Runtime.InteropServices;

public class ToBrowser : MonoBehaviour
{
  public TMP_InputField input;

  [DllImport("__Internal")]
  private static extern void SendToBrowser(string str);

  public void CallSendToBrowser()
  {
    SendToBrowser(input.text);
  }
}
