using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScreenScalerScript : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()

    {
        var scale = (Screen.width/180f)/6;
//        transform.localScale = new Vector3(scale, scale,0);
        Debug.Log(Screen.width);
        Debug.Log(Screen.height);
        Debug.Log(scale);
        Debug.Log(transform.localScale);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}