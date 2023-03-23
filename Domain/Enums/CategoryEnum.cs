using System.Runtime.Serialization;

namespace Domain;

public enum CategoryEnum
{
    [EnumMember(Value = "Drinks")]
    Drinks,
    [EnumMember(Value = "Culture")]
    Culture,
    [EnumMember(Value = "Music")]
    Music,
    [EnumMember(Value = "Travel")]
    Travel,
    [EnumMember(Value = "Film")]
    Film,
    [EnumMember(Value = "Food")]
    Food
}