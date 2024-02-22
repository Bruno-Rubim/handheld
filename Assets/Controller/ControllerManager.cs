using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ControllerManager : MonoBehaviour
{

    public bool circlePressed;
    public bool squarePressed;
    public bool crossPressed;
    public bool trianglePressed;
    public bool dpadUpPressed;
    public bool dpadDownPressed;
    public bool dpadLeftPressed;
    public bool dpadRightPressed;
    public bool selectPressed;
    public bool startPressed;

    public void ButtonCirclePressed()
    {
        circlePressed = true;
        Debug.Log("CirclePressed");
    }
    public void ButtonCircleNotPressed()
    {
        circlePressed = false;
    }

    public void ButtonSquarePressed()
    {
        squarePressed = true;
        Debug.Log("SquarePressed");
    }
    public void ButtonSquareNotPressed()
    {
        squarePressed = false;
    }

    public void ButtonCrossPressed()
    {
        crossPressed = true;
        Debug.Log("CrossPressed");
    }
    public void ButtonCrossNotPressed()
    {
        crossPressed = false;
    }

    public void ButtonTrianglePressed()
    {
        trianglePressed = true;
        Debug.Log("TrianglePressed");
    }
    public void ButtonTriangleNotPressed()
    {
        trianglePressed = false;
    }

    public void ButtonDpadUpPressed()
    {
        dpadUpPressed = true;
        Debug.Log("DpadUpPressed");
    }
    public void ButtonDpadUpNotPressed()
    {
        dpadUpPressed = false;
    }

    public void ButtonDpadDownPressed()
    {
        dpadDownPressed = true;
        Debug.Log("DpadDownPressed");
    }
    public void ButtonDpadDownNotPressed()
    {
        dpadDownPressed = false;
    }

    public void ButtonDpadLeftPressed()
    {
        dpadLeftPressed = true;
        Debug.Log("DpadLeftPressed");
    }
    public void ButtonDpadLeftNotPressed()
    {
        dpadLeftPressed = false;
    }

    public void ButtonDpadRightPressed()
    {
        dpadRightPressed = true;
        Debug.Log("DpadRightPressed");
    }
    public void ButtonDpadRightNotPressed()
    {
        dpadRightPressed = false;
    }

    public void ButtonSelectPressed()
    {
        selectPressed = true;
        Debug.Log("SelectPressed");
    }
    public void ButtonSelectNotPressed()
    {
        selectPressed = false;
    }

    public void ButtonStartPressed()
    {
        startPressed = true;
        Debug.Log("StartPressed");
    }
    public void ButtonStartNotPressed()
    {
        startPressed = false;
    }

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
