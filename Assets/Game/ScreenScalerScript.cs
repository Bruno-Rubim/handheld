using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScreenScalerScript : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()

    {
        transform.localScale = new Vector3(Screen.height/1080f,Screen.height/1080f,0);
        Debug.Log(transform.localScale);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}